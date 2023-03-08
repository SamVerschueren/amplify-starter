import * as fs from 'node:fs';
import * as path from 'node:path';

const filePath = path.resolve('node_modules/amplify-cli-core/lib/context/plugin-platform.js');

let contents = fs.readFileSync(filePath, 'utf8');

/**
 * Update the list of `pluginDirectories` to also include `packaged-node-modules`. An alternative
 * approach is by manually writing a `~/.amplify/plugins.json` file.
 * 
 * @see https://github.com/SamVerschueren/amplify-starter/blob/a349dd7ca72ee3d30fe28d83ac303ff0552115eb/setup-files/patch/amplify-plugins.mjs
 */
contents = contents.replace(
  /this\.pluginDirectories = \[(.*?)\];/, 
  `this.pluginDirectories = [$1, constants_1.constants.PACKAGED_NODE_MODULES];`
);

fs.writeFileSync(filePath, contents);
