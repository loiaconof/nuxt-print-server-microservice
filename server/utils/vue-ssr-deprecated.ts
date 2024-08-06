import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import fs from 'node:fs'

export async function componentToHtml(path: string, data: Record<string, any>) {
  const componentSFCCode = fs.readFileSync(`./pages/${path}`, 'utf-8')
  const app = createSSRApp({
    data: () => (data),
    template: componentSFCCode
  })

  const result = stripVueRenderTags(await renderToString(app))
  return `<!DOCTYPE html>
<html>
  <body>
    ${result}
  </body>
</html>`
}

function stripVueRenderTags(html: string) {
  return html
  .replace('<template>', '')
  .replace('</template>', '')
}
