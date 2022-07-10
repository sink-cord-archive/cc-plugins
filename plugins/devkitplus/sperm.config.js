const arraybuffer = require("@wemap/rollup-plugin-arraybuffer");

module.exports = {
	rollup: {
		inPlugins: [
			arraybuffer({
				include: "**/*.wasm",
			}),
		],
	},
};
