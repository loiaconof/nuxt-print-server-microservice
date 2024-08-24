import puppeteer, { type PDFOptions, type PuppeteerLaunchOptions } from 'puppeteer'
import { defu } from 'defu'

export interface ExportPdfOptions {
  puppeteerLaunchOptions?: PuppeteerLaunchOptions
  pdfOptions?: PDFOptions
}

const url = (event: H3Event<EventHandlerRequest>, path: string) => {
  const protocol = event.req.headers['x-forwarded-proto'] || 'http'
  const host = event.req.headers.host
  return `${protocol}://${host}${path}`
}

const defaultPuppeteerLaunchOptions: PuppeteerLaunchOptions = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
}

const defaultPdfOptions: PDFOptions = {
  format: 'A4',
  printBackground: true,
}

export async function exportPdf(event: H3Event<EventHandlerRequest>, filename: string, path: string, options?: Partial<ExportPdfOptions>) {
  const mergedLaunchOptions = defu(options?.puppeteerLaunchOptions ?? {}, defaultPuppeteerLaunchOptions)
  const mergedPdfOptions = defu(options?.pdfOptions ?? {}, defaultPdfOptions)

  try {
    const browser = await puppeteer.launch(mergedLaunchOptions)
    const page = await browser.newPage()

    const cookies = getCookies(event)
    if (cookies.length > 0) {
      await page.setCookie(...cookies)
    }

    await page.goto(url(event, path), { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf(mergedPdfOptions)

    await browser.close()

    event.node.res.setHeader('Content-Type', 'application/pdf')
    event.node.res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    event.node.res.setHeader('Content-Length', pdfBuffer.length)

    return pdfBuffer
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF')
  }
}

function getCookies(event: H3Event<EventHandlerRequest>) {
  const cookies = parseCookies(event)

  return Object.entries(cookies).map(([name, value]) => ({
    name,
    value,
    domain: event.req.headers.host,
  }))
}
