export async function getMessage() {
    const { getMessage } = await import('./chunk_000102');
    return await getMessage();
}