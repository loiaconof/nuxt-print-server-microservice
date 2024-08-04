import { componentToHtml } from "~/server/utils/vue-ssr";

export default defineEventHandler(async (event) => {
  return await componentToHtml('example.vue', { title: 'I\'m the title', message: 'message!' })
});
