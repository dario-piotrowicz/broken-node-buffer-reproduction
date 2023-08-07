export async function getMessage() {
    const { getMessage } = await import('./chunk_404');
    return await getMessage();
}