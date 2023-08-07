export async function getMessage() {
    const { getMessage } = await import('./chunk_000101');
    return await getMessage();
}