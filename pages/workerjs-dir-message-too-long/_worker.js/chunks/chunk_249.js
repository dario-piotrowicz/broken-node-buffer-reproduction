export async function getMessage() {
    const { getMessage } = await import('./chunk_250');
    return await getMessage();
}