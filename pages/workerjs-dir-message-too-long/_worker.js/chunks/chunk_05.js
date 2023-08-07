export async function getMessage() {
    const { getMessage } = await import('./chunk_06');
    return await getMessage();
}