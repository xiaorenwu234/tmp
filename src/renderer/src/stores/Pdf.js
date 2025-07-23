export const openPdf = (row) => {
  const { id, article_type, chinese_standard_name, current_standard_number } = row
  window.open(
    `/#/reader?id=${encodeURIComponent(id)}&type=${encodeURIComponent(article_type)}&name=${encodeURIComponent(`${current_standard_number} ${chinese_standard_name}`)}`
  )
}
