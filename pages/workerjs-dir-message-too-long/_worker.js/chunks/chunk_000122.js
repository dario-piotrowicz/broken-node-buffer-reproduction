export async function getMessage() {
    const { getMessage } = await import('./chunk_000123');
    return await getMessage();
}