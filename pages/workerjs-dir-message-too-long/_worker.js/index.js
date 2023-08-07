export default {
    async fetch(request, env, ctx) {
        const { getMessage } = await import('./chunks/chunk_00');
        return new Response(await getMessage());
    },
};
