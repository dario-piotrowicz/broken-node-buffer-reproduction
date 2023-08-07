export async function getMessage() {
    const { getMessage } = await import('./chunk_012345');
    return await getMessage();
}