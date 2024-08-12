import puppeteer, { type PDFOptions } from 'puppeteer';
import { defu } from 'defu';

export async function exportPdf(event: H3Event<EventHandlerRequest>, filename: string, path: string, options?: Partial<{ pdfOptions: PDFOptions }>) {
  const html = await $fetch<string>(path);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: 'domcontentloaded'
  });

  const defaultOptions: PDFOptions = {
    format: 'A4',
    printBackground: true
  };
  const pdfBuffer = await page.pdf(defu(options?.pdfOptions ?? {}, defaultOptions));

  await browser.close();

  event.node.res.setHeader('Content-Type', 'application/pdf');
  event.node.res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  event.node.res.setHeader('Content-Length', pdfBuffer.length);

  return pdfBuffer;
}
