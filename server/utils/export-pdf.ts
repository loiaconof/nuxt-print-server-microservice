import puppeteer, { type PuppeteerLaunchOptions, type PDFOptions } from 'puppeteer';
import { defu } from 'defu';

export interface ExportPdfOptions { 
  puppeteerLaunchOpions: PuppeteerLaunchOptions, 
  pdfOptions: PDFOptions,
}

export async function exportPdf(event: H3Event<EventHandlerRequest>, filename: string, path: string, options?: Partial<ExportPdfOptions>) {
  const html = await $fetch<string>(path);

  const defaultPuppeteerLaunchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
  const browser = await puppeteer.launch(defu(options?.puppeteerLaunchOpions ?? {}, defaultPuppeteerLaunchOptions));
  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: 'domcontentloaded'
  });

  const defaultPdfOptions: PDFOptions = {
    format: 'A4',
    printBackground: true
  };
  const pdfBuffer = await page.pdf(defu(options?.pdfOptions ?? {}, defaultPdfOptions));

  await browser.close();

  event.node.res.setHeader('Content-Type', 'application/pdf');
  event.node.res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  event.node.res.setHeader('Content-Length', pdfBuffer.length);

  return pdfBuffer;
}
