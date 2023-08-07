export async function getMessage() {
    const { getMessage } = await import('./chunk_360');
    return await getMessage();
}