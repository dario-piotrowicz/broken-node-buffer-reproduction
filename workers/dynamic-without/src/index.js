export default {
	async fetch(request, env, ctx) {
		return import('./hello-msg.js').then(({helloMsg}) => {
			return new Response('lazy without nested dir -> ' + helloMsg);
		})
	},
};
