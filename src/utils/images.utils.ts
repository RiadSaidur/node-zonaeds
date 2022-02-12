import { unlinkSync } from "fs"

export const getImageURLs = (images: Express.Multer.File[]) => {
  const imageURLs = images.map(image => `${image.filename}`)
  return imageURLs
}

export const deleteImageFromStorage = (folder: string, images: string[]) => {
  images.forEach(image => unlinkSync(`uploads/${folder}/${image}`))
}