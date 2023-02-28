import * as fs from 'node:fs'
import * as path from 'node:path'

const filepath = path.resolve('/home/.amplify/plugins.json')
const read = fs.readFileSync(filepath, 'utf-8')
const parsed = JSON.parse(read)

const key = 'packaged-node-modules'

if (parsed.pluginDirectories.includes(key)) {
  process.exit(0)
}

parsed.pluginDirectories = [...parsed.pluginDirectories, key]

fs.writeFileSync(filepath, JSON.stringify(parsed, null, 2), 'utf-8')
