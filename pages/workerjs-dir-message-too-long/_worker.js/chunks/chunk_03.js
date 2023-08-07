export async function getMessage() {
    const { getMessage } = await import('./chunk_04');
    return await getMessage();
}