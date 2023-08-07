export async function getMessage() {
    const { getMessage } = await import('./chunk_000001');
    return await getMessage();
}