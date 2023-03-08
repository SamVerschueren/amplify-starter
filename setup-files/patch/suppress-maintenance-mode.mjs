/**
 * When using the Amplify CLI, it will show warnings about AWS SDK v2 being in maintenance mode.
 * This patch adds an additional line to the `amplify` binary which suppresses that warning.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const suppressWarning = `require('aws-sdk/lib/maintenance_mode_message').suppress = true;`;

const filePath = path.resolve('node_modules/.bin/amplify');

let contents = fs.readFileSync(filePath, 'utf8');

// supress the warning by appending the rule right after the `eslint-disable` line
contents = contents.replace(/(\/\* eslint-disable .*? \*\/)/, `$1\n${suppressWarning}`);

fs.writeFileSync(filePath, contents);
