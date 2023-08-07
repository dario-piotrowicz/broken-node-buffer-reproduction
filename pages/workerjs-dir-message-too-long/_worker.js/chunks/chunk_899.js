export async function getMessage() {
    const { getMessage } = await import('./chunk_900');
    return await getMessage();
}