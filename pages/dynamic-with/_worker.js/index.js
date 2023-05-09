export default {
	async fetch(request, env, ctx) {
		return import('./myNestedDir/hello-msg.js').then(({helloMsg}) => {
			return new Response('lazy with nested dir -> ' + helloMsg);
		})
	},
};
