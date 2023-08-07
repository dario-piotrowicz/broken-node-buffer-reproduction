export async function getMessage() {
    const { getMessage } = await import('./chunk_000002');
    return await getMessage();
}