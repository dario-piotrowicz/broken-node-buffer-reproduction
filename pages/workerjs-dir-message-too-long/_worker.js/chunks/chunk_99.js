export async function getMessage() {
    const { getMessage } = await import('./chunk_100');
    return await getMessage();
}