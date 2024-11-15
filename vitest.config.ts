import viteConfig from "./vite.config";
import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig, mergeConfig } from "vitest/config";

// Default vitest configuration for all tests
export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: "jsdom",
            include: ["**/*.vitest.ts"], // All vitest files
            exclude: [...configDefaults.exclude, "e2e/**"], // Exclude e2e
            root: fileURLToPath(new URL("./", import.meta.url)),
        },
    }),
);
