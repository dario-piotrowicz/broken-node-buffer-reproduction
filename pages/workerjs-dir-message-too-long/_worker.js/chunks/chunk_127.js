export async function getMessage() {
    const { getMessage } = await import('./chunk_128');
    return await getMessage();
}