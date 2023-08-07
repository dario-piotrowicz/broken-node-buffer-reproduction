export async function getMessage() {
    const { getMessage } = await import('./chunk_800');
    return await getMessage();
}