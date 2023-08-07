export async function getMessage() {
    const { getMessage } = await import('./chunk_010203');
    return await getMessage();
}