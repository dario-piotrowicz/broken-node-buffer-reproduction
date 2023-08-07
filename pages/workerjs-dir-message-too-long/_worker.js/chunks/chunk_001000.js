export async function getMessage() {
    const { getMessage } = await import('./chunk_001001');
    return await getMessage();
}