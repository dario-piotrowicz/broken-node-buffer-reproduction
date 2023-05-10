import { AsyncLocalStorage } from 'node:async_hooks';
const __ENV_ALS__ = new AsyncLocalStorage();

globalThis.process = {
	env: new Proxy(
		{},
		{
			get: (_, property) => {
				return Reflect.get(__ENV_ALS__.getStore(), property);
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
