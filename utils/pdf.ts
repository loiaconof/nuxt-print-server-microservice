export async function downloadPdf(url: string) {
  const res = await $fetch.raw<FetchResponse<Blob>>(url)
  downloadBlob(res._data, getResponseFilename(res))
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  a.remove()
}

export function getResponseFilename(response: FetchResponse) {
  const contentDisposition = response.headers.get('Content-Disposition')
  const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/)
  return filenameMatch && filenameMatch[1]
}
