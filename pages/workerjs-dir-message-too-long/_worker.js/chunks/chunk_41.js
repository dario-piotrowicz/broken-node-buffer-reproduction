export async function getMessage() {
    const { getMessage } = await import('./chunk_42');
    return await getMessage();
}