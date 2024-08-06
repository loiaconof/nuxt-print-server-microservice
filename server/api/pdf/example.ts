import { componentToHtml } from "~/server/utils/vue-ssr";

export default defineEventHandler(async (event) => {
  return await $fetch('/example')
});
