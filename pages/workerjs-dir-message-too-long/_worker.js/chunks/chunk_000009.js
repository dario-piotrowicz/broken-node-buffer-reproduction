export async function getMessage() {
    const { getMessage } = await import('./chunk_000010');
    return await getMessage();
}