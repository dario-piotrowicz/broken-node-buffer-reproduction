export async function getMessage() {
    const { getMessage } = await import('./chunk_700');
    return await getMessage();
}