export async function getMessage() {
    const { getMessage } = await import('./chunk_001020');
    return await getMessage();
}