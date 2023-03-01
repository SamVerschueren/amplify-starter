/**
 * Patches an issue with an invalid `main` field in the `cloudform` package. This was fixed upstream,
 * but is hard to get it updated in the Amplify CLI itself because it depends on it in various different
 * places.
 *
 * @see https://github.com/aws-amplify/amplify-cli/issues/9939
 * @see https://github.com/bright/cloudform/issues/70
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const filePath = path.resolve('node_modules/cloudform/package.json');

let packageJson = fs.readFileSync(filePath, 'utf8');

packageJson = packageJson.replace('"main": "packages/cloudform/index.js"', '"main": "index.js"');

fs.writeFileSync(filePath, packageJson);
