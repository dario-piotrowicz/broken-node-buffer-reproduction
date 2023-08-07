export async function getMessage() {
    const { getMessage } = await import('./chunk_224');
    return await getMessage();
}