import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import childProcess from 'node:child_process';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const patchFileLocation = path.join(__dirname, 'patch');

const patchFiles = fs.readdirSync(patchFileLocation);

for (const patchFile of patchFiles) {
    childProcess.spawnSync('node', [path.join(patchFileLocation, patchFile)], {
        cwd: path.resolve(__dirname, '..'),
        stdio: 'ignore'
    });
}