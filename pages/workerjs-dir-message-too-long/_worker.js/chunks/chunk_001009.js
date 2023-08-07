export async function getMessage() {
    const { getMessage } = await import('./chunk_001010');
    return await getMessage();
}