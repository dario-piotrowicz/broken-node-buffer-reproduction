export async function getMessage() {
    const { getMessage } = await import('./chunk_384');
    return await getMessage();
}