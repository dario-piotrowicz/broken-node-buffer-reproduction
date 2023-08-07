export async function getMessage() {
    const { getMessage } = await import('./chunk_500');
    return await getMessage();
}