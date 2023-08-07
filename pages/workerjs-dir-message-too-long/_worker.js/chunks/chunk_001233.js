export async function getMessage() {
    const { getMessage } = await import('./chunk_001234');
    return await getMessage();
}