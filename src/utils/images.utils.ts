import { unlinkSync } from "fs"

export const getImageURLs = (images: Express.Multer.File[]) => {
  const imageURLs = images.map(image => `${image.filename}`)
  return imageURLs
}

export const deleteImageFromStorage = (image: string) => {
  unlinkSync(`uploads/${image}`)
}