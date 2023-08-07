export async function getMessage() {
    const { getMessage } = await import('./chunk_512');
    return await getMessage();
}