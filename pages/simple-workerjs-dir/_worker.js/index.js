export default {
	async fetch(request, env, ctx) {
		return new Response('Hello from a simple _worker.js dir Pages app');		
	}
};
