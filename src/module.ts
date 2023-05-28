import {
  defineNuxtModule,
  addImportsDir,
  addComponentsDir,
  createResolver,
  addTemplate,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "my-module",
    configKey: "myModule",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // let's say we have some dynamic types generated at runtime by the module
    const { dst } = addTemplate({
      filename: "types/dynamic.d.ts",
      getContents: () => `type SomeType = {
  test: string
  test2: string
  test3: number
}`,
    });
    nuxt.hook("prepare:types", ({ references }) => {
      references.push({
        path: dst,
      });
    });

    // auto import composables and components
    addImportsDir(resolver.resolve("runtime/composables"));
    addComponentsDir({
      path: resolver.resolve("runtime/components"),
      pathPrefix: false,
    });
  },
});
