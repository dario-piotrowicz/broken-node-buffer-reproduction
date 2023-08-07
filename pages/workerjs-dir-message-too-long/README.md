# Reproduction of the "message too large" error

This is a minimal reproduction for the following Pages deployment error:
```
deploy_worker_failed:multipart: message too large
```

It seems like the issue is caused by a large number of files inside the `_worker.js` directory
(through experimentation it seems like the maximum number of supported files is 1000)

## How to reproduce the issue

Simply deploy this directory as a Pages app using wrangler:
```
$ npx wrangler pages deploy .
```

The deployment should fail because of the message too long error.

If you want to experiment with the number of files you can re-generate the `_worker.js` directory
via the `generateWorkerjs.mjs` node script, via:
```
node ./generateWorkerjs.mjs --files=N
```
where `N - 1` is the number of chunk files you want to generate (+ the index.js file)

If you also generate the files so that they are being lazy loaded (daisy chaining the chunk files) provide
the `--lazy` flag:
```
node ./generateWorkerjs.mjs --files=999 --lazy
```