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
			globalThis.fetch = async () => {
				const binaryContent = (
					await import(`./noto-sans-v27-latin-regular.ttf`)
				).default;
			
				return {
					async arrayBuffer() {
						return binaryContent;
					},
				};
			};

			return import('./getVercelOgResponse.js').then(({getVercelOgResponse}) => {
				try {
					return getVercelOgResponse();
				} catch (e) {
					return new Response(
						'An error occurred when generating the vercel og response'
						+ (e instanceof Error) ? `: ${e.message}` : ''
					, { status: 500 });
				}
			})
		});
	}
};
