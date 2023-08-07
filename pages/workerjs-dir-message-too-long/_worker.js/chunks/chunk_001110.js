export async function getMessage() {
    const { getMessage } = await import('./chunk_001111');
    return await getMessage();
}