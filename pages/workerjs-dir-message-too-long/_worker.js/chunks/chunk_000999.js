export async function getMessage() {
    const { getMessage } = await import('./chunk_001000');
    return await getMessage();
}