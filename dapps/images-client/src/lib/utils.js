
export const parseFileName = filename => {
  const p = filename.indexOf('.')
  const address = p >= 0 ? filename.substring(0, p) : filename
  const extension = p >= 0 ? filename.substring(p + 1) : ''
  return { address, extension }
}

export const createImageURL = (typedArray, type) => {
  if (!type) throw new Error('Missing image type')
  console.log(typedArray.name)
  return URL.createObjectURL(new Blob([typedArray.buffer], { type }))
}
