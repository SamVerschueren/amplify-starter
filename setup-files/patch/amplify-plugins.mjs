import * as fs from 'node:fs';
import * as path from 'node:path';

const filepath = path.resolve(process.env.HOME, '.amplify/plugins.json');

fs.mkdirSync(path.dirname(filepath), { recursive: true });

/**
 * Write a `plugins.json` file with the default settings. The only thing we add is
 * `packaged-node-modules` which will force Amplify to also look into the local
 * `node_modules` directory. We also set the `lastScanTime` to something in the past
 * to force a new scan.
 */
fs.writeFileSync(filepath, JSON.stringify(
  {
    pluginDirectories: [
      'cli-local-node-modules',
      'cli-parent-directory',
      'global-node-modules',
      'packaged-node-modules'
    ],
    pluginPrefixes: [
      'amplify-'
    ],
    userAddedLocations: [],
    lastScanTime: '2000-01-01T00:00:00.000Z',
    maxScanIntervalInSeconds: 86400,
    plugins: {},
    excluded: {}
  },
  undefined,
  '  '
));
