/**
 * Patches an issue with an invalid `main` field in the `cloudform` package. This was fixed upstream,
 * but is hard to get it updated in the Amplify CLI itself because it depends on it in various different
 * places.
 * 
 * @see https://github.com/aws-amplify/amplify-cli/issues/9939
 * @see https://github.com/bright/cloudform/issues/70
 */
import * as fs from 'node:fs'
import * as path from 'node:path'

const supressWarning = `require('aws-sdk/lib/maintenance_mode_message').suppress = true;`;

const filePath = path.resolve('node_modules/.bin/amplify');

let contents = fs.readFileSync(filePath, 'utf8');

// supress the warning by appending the rule right after the `eslint-disable` line
contents = contents.replace(/(\/\* eslint-disable .*? \*\/)/, `$1\n${supressWarning}`);

fs.writeFileSync(filePath, contents);