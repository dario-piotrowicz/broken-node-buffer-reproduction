export async function getMessage() {
    const { getMessage } = await import('./chunk_123');
    return await getMessage();
}