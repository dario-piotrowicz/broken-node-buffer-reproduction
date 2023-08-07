import { mkdir, rm, writeFile } from 'node:fs/promises';

const dynamicImports = process.argv;

let files = process.argv.map(
    arg => {
        const match = arg.match(/--files=(\d+)/)
        if(!match) return;
        return parseInt(match[1]);
    }
).find(arg => arg !== undefined);

if(files === 0) {
    console.error('The number of files must be >= 1');
    process.exit(1);
}

if(!files) {
    const defaultNumOfFiles = 10;
    console.warn(`No number of files provided, defaulting to ${defaultNumOfFiles}`);
    files = defaultNumOfFiles;
}

const lastChunkNum = files - 1;
const paddingNum = `${lastChunkNum}`.length - 1;

function formatChunkNum(chunkNum) {
    return `${chunkNum}`.padStart(paddingNum, '0');
}

async function createStaticChunkFiles() {
    return Promise.all(new Array(lastChunkNum).fill(0).map(async (_, chunkNum) => {

        const chunkNumStr = formatChunkNum(chunkNum);

        await writeFile(
            `./src/chunks/chunk_${chunkNumStr}.js`,
            `export default ${chunkNum};`
        );
    })
    );
}

async function createStaticIndex() {
    const chunkImports = new Array(lastChunkNum)
        .fill(0)
        .map((_, chunkNum) => `import chunkNum${formatChunkNum(chunkNum)} from './chunks/chunk_${formatChunkNum(chunkNum)}.js';`)
        .join('\n');
    await writeFile(
        `./src/index.js`,
        `${chunkImports}

export default {
    async fetch(request, env, ctx) {
        return new Response('Statically importing ${lastChunkNum} files');
    },
};
`);
}

await rm('./src', { recursive: true, force: true });
await mkdir('./src/chunks/', { recursive: true });

await createStaticChunkFiles();
await createStaticIndex();