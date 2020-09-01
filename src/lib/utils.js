export const getAsanaImageUrl = (asana) => {
  const fileName = asana ? asana.file_name : null
  return fileName ? `${process.env.REACT_APP_API_URL}/asanas/thumbnails/${fileName}` : ''
}
