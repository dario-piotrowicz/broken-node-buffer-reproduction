export async function getMessage() {
    const { getMessage } = await import('./chunk_010101');
    return await getMessage();
}