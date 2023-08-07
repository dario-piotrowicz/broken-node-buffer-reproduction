export async function getMessage() {
    const { getMessage } = await import('./chunk_200');
    return await getMessage();
}