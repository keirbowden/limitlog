limitcapture
============

Salesforce CLI Plug-in to capture limit information after a unit test is run and store in a custom object

[![Version](https://img.shields.io/npm/v/limitcapture.svg)](https://npmjs.org/package/limitcapture)
[![CircleCI](https://circleci.com/gh/keirbowden/limitcapture/tree/master.svg?style=shield)](https://circleci.com/gh/keirbowden/limitcapture/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/keirbowden/limitcapture?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/limitcapture/branch/master)
[![Codecov](https://codecov.io/gh/keirbowden/limitcapture/branch/master/graph/badge.svg)](https://codecov.io/gh/keirbowden/limitcapture)
[![Greenkeeper](https://badges.greenkeeper.io/keirbowden/limitcapture.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/keirbowden/limitcapture/badge.svg)](https://snyk.io/test/github/keirbowden/limitcapture)
[![Downloads/week](https://img.shields.io/npm/dw/limitcapture.svg)](https://npmjs.org/package/limitcapture)
[![License](https://img.shields.io/npm/l/limitcapture.svg)](https://github.com/keirbowden/limitcapture/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g limitlog
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
limitlog/0.0.0 darwin-x64 node-v11.10.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx bblimlog:test [-n <string>] [-t <string>] [-s <string>] [-w] [-r <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-bblimlogtest--n-string--t-string--s-string--w--r-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx bblimlog:test [-n <string>] [-t <string>] [-s <string>] [-w] [-r <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
print a greeting and your org IDs

USAGE
  $ sfdx bblimlog:test [-n <string>] [-t <string>] [-s <string>] [-w] [-r <string>] [-v <string>] [-u <string>] 
  [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -n, --name=name                                                                   name to use when writing the limit
                                                                                    object

  -r, --runtestusername=runtestusername                                             Username/alias to run the tests as
                                                                                    (omit to use the same username as
                                                                                    the -u/-a switch)

  -s, --namespace=namespace                                                         Namespace of the limits output (omit
                                                                                    for default namespace)

  -t, --test=test                                                                   Name of test to run

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  -w, --write                                                                       Write the limits information to
                                                                                    Salesforce

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx bblimlog:test -n LimitLogSample -r KABDEV -t LimitLogSampleTest.DoWorkTest -s KAB_TUTORIAL -u LIMITLOG -w
  
  Executing test LimitLogSampleTest.DoWorkTest
  Retrieving test log file
  Extracting limits information
  Writing limits information to Salesforce
  Limits information written to Salesforce
```

_See code: [lib/commands/bblimlog/test.js](https://github.com/keirbowden/limitlog/blob/v0.0.0/lib/commands/bblimlog/test.js)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
