import { defineConfig } from "tsup"

export const tsup = defineConfig({
	entry: ["src/index.ts"],
	clean: true,
	format: ["esm"],
	outDir: "bin",
	banner: {
		"js": "#!/usr/bin/env node"
	}
})