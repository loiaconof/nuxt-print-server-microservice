export default defineEventHandler(async (event) => {
  return await $fetch('/example')
});
