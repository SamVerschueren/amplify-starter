import * as fs from 'node:fs'
import * as path from 'node:path'

const filePath = path.resolve('node_modules/cloudform/package.json');

let packageJson = fs.readFileSync(filePath, 'utf8');

packageJson = packageJson.replace('"main": "packages/cloudform/index.js"', '"main": "index.js"');

fs.writeFileSync(filePath, packageJson);