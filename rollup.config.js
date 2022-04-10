// 对于 rollup 插件 typescript 的重写增加 ts 的诊断
import typescript2 from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import {terser} from "rollup-plugin-terser";
import pkg from "./package.json";
import copy from 'rollup-plugin-copy'
export default {
    input: "src/index.tsx",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
        },
        {
            file: pkg.module,
            format: "es",
            exports: "named",
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
        postcss({
            extract: false,
            modules: true,
            use: ["less"]
        }),
        typescript2({
            typescript: require("typescript")
        }),
        process.env.NODE_ENV === "production" ? terser() : null,
        copy({
            targets: [
                { src: 'src/font', dest: 'lib' },
            ]
        })
    ]
};
