import * as fs from 'node:fs';
import * as path from 'node:path';
import * as childProcess from 'node:child_process';
import * as url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// initialize the `~/.amplify` folder with it's plugins
initialize();

const filepath = path.resolve(process.env.HOME, '.amplify/plugins.json');
const read = fs.readFileSync(filepath, 'utf-8');
const parsed = JSON.parse(read);

const key = 'packaged-node-modules';

if (parsed.pluginDirectories.includes(key)) {
  process.exit(0);
}

/**
 * Add `packaged-node-modules` to the plugin directories, this will enforce Amplify to also
 * read in the local installed `node_modules`.
 * 
 * By setting the `lastScanTime` to something in the past, we can retrigger initialization in
 * order for Amplify to now also pick up the local node module plugins.
 */
parsed.pluginDirectories = [...parsed.pluginDirectories, key];
parsed.lastScanTime = '2000-01-01T00:00:00.000Z';

fs.writeFileSync(filepath, JSON.stringify(parsed, null, 2), 'utf-8');

// initialize again with the updated `plugins.json`
initialize();

function initialize() {
  childProcess.spawnSync('amplify', ['version'], {
    stdio: 'ignore',
    env: {
      ...process.env,
      PATH: `${process.env.PATH}:${path.resolve(__dirname, '../../node_modules/.bin')}`
    }
  });
}
