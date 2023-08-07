export async function getMessage() {
    const { getMessage } = await import('./chunk_64');
    return await getMessage();
}