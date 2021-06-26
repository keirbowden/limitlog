import { LimitsConsumed } from './types';


const keys : Map<string, string>=new Map([
    ['SOQL queries', 'soqlQueries'],
    ['query rows', 'queryRows'],
    ['SOSL queries', 'soslQueries'],
    ['DML statements', 'dmlStatements'],
    ['Publish Immediate DML', 'publishImmediateDml'],
    ['DML Rows', 'dmlRows'],
    ['CPU time', 'cpuTime'],
    ['heap size', 'heapSize'],
    ['callouts', 'callouts'],
    ['Email Invocations', 'emails'],
    ['future calls', 'futureCalls'],
    ['queueable jobs', 'queueables'],
    ['Mobile Apex', 'mobilePush']
]);

let ProcessLog = (logBody, namespace) => {
    const logLines=logBody.split('\n');
    let limits: LimitsConsumed = {
        soqlQueries : 0,
        queryRows : 0,
        soslQueries : 0,
        dmlStatements : 0,
        publishImmediateDml : 0,
        dmlRows : 0,
        cpuTime : 0,
        heapSize : 0,
        callouts : 0,
        emails : 0,
        futureCalls : 0,
        queueables : 0,
        mobilePush : 0
    }

    const startStanza='LIMIT_USAGE_FOR_NS|' + namespace +'|';

    let started=false;
    let complete=false;
    logLines.forEach((line) => {
        if (!complete) {
            if (started) {
                keys.forEach((value, key) => {
                    if (-1!=line.indexOf(key)) {
                        const start=line.indexOf(':') + 1;
                        const end=line.indexOf(' ', start+1);
                        const num=line.substring(start, end);
                        limits[value]=parseInt(num);
                        if ('mobilePush'==value) {
                            complete=true;
                        }
                    }
                }); 
            }
            if (-1!=line.indexOf(startStanza)) {
                started=true;
            }        
        }
    });

    return limits;
}

export {ProcessLog};