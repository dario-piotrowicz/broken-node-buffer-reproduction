export async function getMessage() {
    const { getMessage } = await import('./chunk_000500');
    return await getMessage();
}