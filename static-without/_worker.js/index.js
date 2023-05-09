import { helloMsg } from './hello-msg.js';

export default {
	async fetch(request, env, ctx) {
		return new Response('static without nested dir -> ' + helloMsg);
	},
};
