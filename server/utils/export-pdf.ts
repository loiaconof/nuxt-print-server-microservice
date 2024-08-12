import puppeteer from 'puppeteer';

export async function exportPdf(event: H3Event<EventHandlerRequest>, filename: string, path: string) {
  const html = await $fetch<string>(path);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: 'domcontentloaded'
  });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true
  });

  await browser.close();

  event.node.res.setHeader('Content-Type', 'application/pdf');
  event.node.res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  event.node.res.setHeader('Content-Length', pdfBuffer.length);

  return pdfBuffer;
}
