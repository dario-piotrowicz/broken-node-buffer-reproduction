export async function getMessage() {
    const { getMessage } = await import('./chunk_300');
    return await getMessage();
}