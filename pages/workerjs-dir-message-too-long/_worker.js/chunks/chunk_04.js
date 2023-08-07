export async function getMessage() {
    const { getMessage } = await import('./chunk_05');
    return await getMessage();
}