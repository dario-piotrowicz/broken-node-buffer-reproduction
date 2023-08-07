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

const lazyLoading = process.argv.indexOf('--lazy') > -1;

const lastChunkNum = files - 1;
const paddingNum = `${lastChunkNum}`.length - 1;

function formatChunkNum(chunkNum) {
    return `${chunkNum}`.padStart(paddingNum, '0');
}

async function createLazyChunkFiles() {
    return Promise.all(new Array(lastChunkNum).fill(0).map(async (_, chunkNum) => {
        const isLastChunk = chunkNum >= (lastChunkNum - 1);

        const chunkNumStr = formatChunkNum(chunkNum);

        await writeFile(
            `./_worker.js/chunks/chunk_${chunkNumStr}.js`,
            !isLastChunk ?
                `export async function getMessage() {
    const { getMessage } = await import('./chunk_${formatChunkNum(chunkNum+ 1)}');
    return await getMessage();
}`:
                `export async function getMessage() {
    return 'hello world ${chunkNumStr}!';
}`
        );
    })
    );
}

async function createLazyIndex() {
    await writeFile(
        `./_worker.js/index.js`,
        `export default {
    async fetch(request, env, ctx) {
        const { getMessage } = await import('./chunks/chunk_${formatChunkNum(0)}');
        return new Response(await getMessage());
    },
};
`);
}

async function createStaticChunkFiles() {
    return Promise.all(new Array(lastChunkNum).fill(0).map(async (_, chunkNum) => {

        const chunkNumStr = formatChunkNum(chunkNum);

        await writeFile(
            `./_worker.js/chunks/chunk_${chunkNumStr}.js`,
            `export default ${chunkNum};`
        );
    })
    );
}

async function createStaticIndex() {
    const chunkImports = new Array(lastChunkNum)
        .fill(0)
        .map((_, chunkNum) => `import chunkNum${formatChunkNum(chunkNum)} from './chunks/chunk_${formatChunkNum(chunkNum)}';`)
        .join('\n');
    await writeFile(
        `./_worker.js/index.js`,
        `${chunkImports}

export default {
    async fetch(request, env, ctx) {
        return new Response('Statically importing ${lastChunkNum} files');
    },
};
`);
}

await rm('./_worker.js', { recursive: true, force: true });
await mkdir('./_worker.js/chunks/', { recursive: true });

if(lazyLoading) {
    await createLazyChunkFiles();
    await createLazyIndex();
} else {
    await createStaticChunkFiles();
    await createStaticIndex();
}