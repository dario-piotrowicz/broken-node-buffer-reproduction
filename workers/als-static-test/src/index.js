import { AsyncLocalStorage } from 'node:async_hooks';
const __ENV_ALS__ = new AsyncLocalStorage();

globalThis.process = {
	env: new Proxy(
		{},
		{
			get: (_, property) => {
				try {
					return Reflect.get(__ENV_ALS__.getStore(), property);
				} catch (e) {
					console.error(`Error: ${e.message}`);
					return `Error: ${e.message}`;
				}
			},
			set: (_, property, value) => {
				return Reflect.set(__ENV_ALS__.getStore(), property, value);
			}
	}),
};

export default {
	async fetch(request, env, ctx) {
		return __ENV_ALS__.run({ ...env }, () => {
			return import('./getMyVarVal.js').then(({getMyVarVal}) => {
				return new Response('the value of my-var is: ' + getMyVarVal());
			})
		});
	}
};
