export async function getMessage() {
    const { getMessage } = await import('./chunk_010123');
    return await getMessage();
}