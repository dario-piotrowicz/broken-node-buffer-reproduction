export async function getMessage() {
    const { getMessage } = await import('./chunk_000005');
    return await getMessage();
}