export async function getMessage() {
    const { getMessage } = await import('./chunk_600');
    return await getMessage();
}