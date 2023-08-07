export async function getMessage() {
    const { getMessage } = await import('./chunk_400');
    return await getMessage();
}