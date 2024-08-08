import puppeteer from 'puppeteer';

export async function exportPdf(filename: string, path: string) {
  const html = await $fetch<string>(path);

  const browser = await puppeteer.launch();
  
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '1in',
      bottom: '1in',
      left: '1in',
      right: '1in'
    }
  });

  await browser.close();

  return pdfBuffer;
}
