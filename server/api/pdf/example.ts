import { exportPdf } from "~/server/utils/export-pdf";

export default defineEventHandler(async (event) => {
  return await exportPdf(event, 'example.pdf', '/pdf/example');
});
