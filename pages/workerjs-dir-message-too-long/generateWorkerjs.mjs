import { mkdir, rm, writeFile } from 'node:fs/promises';

const lastChunkNum = 999;
const paddingNum = `${lastChunkNum}`.length - 1;

function formatChunkNum(chunkNum) {
    return `${chunkNum}`.padStart(paddingNum, '0');
}

async function createChunkFiles() {
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

async function createIndex() {
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


await rm('./_worker.js', { recursive: true, force: true });
await mkdir('./_worker.js/chunks/', { recursive: true });

await createChunkFiles();

await createIndex();