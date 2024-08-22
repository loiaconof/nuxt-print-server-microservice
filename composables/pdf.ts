export default function usePdf() {
  const loading = ref(false)
  const error = ref(undefined)

  function download(url: string) {
    loading.value = true
    error.value = undefined
    try {
      $fetch.raw<FetchResponse<Blob>>(url)
        .then(res => downloadBlob(res._data, getResponseFilename(res)))
        .catch(err => error.value = err)
        .finally(() => loading.value = false)
    } catch (err: any) {
      error.value = err
      loading.value = false
    }
  }


  function downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
  }
  
  function getResponseFilename(response: FetchResponse) {
    const contentDisposition = response.headers.get('Content-Disposition')
    const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/)
    return filenameMatch && filenameMatch[1]
  }
  
  return {
    loading,
    error,
    download
  }
}
