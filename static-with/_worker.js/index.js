import { helloMsg } from './myNestedDir/hello-msg.js';

export default {
	async fetch(request, env, ctx) {
		return new Response('static with nested dir -> ' + helloMsg);
	},
};
