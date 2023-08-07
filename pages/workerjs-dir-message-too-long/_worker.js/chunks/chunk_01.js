export async function getMessage() {
    const { getMessage } = await import('./chunk_02');
    return await getMessage();
}