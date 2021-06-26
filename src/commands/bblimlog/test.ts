import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { promisify } from 'util';
import { exec } from 'child_process';
import { ProcessLog } from '../../shared/limitsprocessor';
import { WriteToSalesforce } from '../../shared/salesforce';
import { LimitsConsumed, SalesforceResult } from '../../shared/types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('limitlog', 'test');

export default class Org extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx bblimlog:test -n LimitLogSample -r KABDEV -t LimitLogSampleTest.DoWorkTest -s KAB_TUTORIAL -u LIMITLOG -w
  
Executing test LimitLogSampleTest.DoWorkTest
Retrieving test log file
Extracting limits information
Writing limits information to Salesforce
Limits information written to Salesforce
  `
  ];

  public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: messages.getMessage('nameFlagDescription')}),
    test: flags.string({char: 't', description: messages.getMessage('testFlagDescription')}),
    namespace: flags.string({char: 's', description: messages.getMessage('namespaceFlagDescription')}),
    write: flags.boolean({char: 'w', description: messages.getMessage('writeFlagDescription')}),
    runtestusername: flags.string({char: 'r', description: messages.getMessage('runtestusernameFlagDescription')}),
    
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const username=this.org.getUsername();

    const runAsUsername=this.flags.runtestusername || username;

    const execPromisfy = promisify(exec);

    const testToRun=this.flags.test;
    this.ux.log(messages.getMessage('runningTest', [testToRun]));
    var { stdout, stderr } = await execPromisfy('sfdx force:apex:test:run -u ' + runAsUsername + ' -t ' + testToRun + ' -y');

    if (stderr) {
      console.error(`error: ${stderr}`);
    }

    this.ux.log(messages.getMessage('retrievingLog'));
    var { stdout, stderr } = await execPromisfy('sfdx force:apex:log:get -u ' + runAsUsername + ' --json');

    if (stderr) {
      console.error(`error: ${stderr}`);
    }

    const logResult=JSON.parse(stdout);
    const logBody=logResult.result[0].log;
    const namespace= this.flags.namespace || '(default)';

    this.ux.log(messages.getMessage('processingLog'));
    const limits:LimitsConsumed=ProcessLog(logBody, namespace);

    const limitsResult=JSON.stringify(limits);

    let result={limits: limitsResult};
  
    if (this.flags.write) {
        this.ux.log(messages.getMessage('writingToSalesforce'));
        const name=this.flags.name;
        let sfResult: SalesforceResult;
        sfResult=await WriteToSalesforce(name, limits, this.org.getConnection());

        if (!sfResult.success) {
          this.ux.log(messages.getMessage('salesforceErrorWriting', [sfResult.errorMessage]));
        }
        else {
          this.ux.log(messages.getMessage('wroteToSalesforce'));
        }

        result['salesforceResult']=sfResult;
    }

    // Return an object to be displayed with --json
    return result;
  }
}
