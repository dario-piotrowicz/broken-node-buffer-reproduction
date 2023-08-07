export async function getMessage() {
    const { getMessage } = await import('./chunk_32');
    return await getMessage();
}