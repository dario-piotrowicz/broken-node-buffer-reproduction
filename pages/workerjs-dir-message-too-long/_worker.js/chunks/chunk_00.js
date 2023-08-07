export async function getMessage() {
    const { getMessage } = await import('./chunk_01');
    return await getMessage();
}