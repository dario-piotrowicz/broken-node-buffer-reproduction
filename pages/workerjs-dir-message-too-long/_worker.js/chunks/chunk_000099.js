export async function getMessage() {
    const { getMessage } = await import('./chunk_000100');
    return await getMessage();
}