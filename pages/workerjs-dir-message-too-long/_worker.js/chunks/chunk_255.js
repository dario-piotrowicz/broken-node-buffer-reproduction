export async function getMessage() {
    const { getMessage } = await import('./chunk_256');
    return await getMessage();
}