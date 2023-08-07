export async function getMessage() {
    const { getMessage } = await import('./chunk_640');
    return await getMessage();
}