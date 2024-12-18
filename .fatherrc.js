import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
    esm: 'rollup',
    cjs: 'rollup',
    umd: {
        sourcemap: true,
        globals: {
            buffer: 'Buffer',
            string_decoder: 'StringDecoder',
            util: 'util'
        },
    },
    extraRollupPlugins: [
        nodePolyfills()
    ]
  };
  