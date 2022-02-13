import { unlinkSync } from "fs"
import sharp from "sharp"

export const getCompressedImageNames = (folder: string, images: Express.Multer.File[]) => {
  const compressedImageNames = images.map(image => {
    const imageName = `compressed-${image.filename}`
    
    sharp(image.path)
      .jpeg({ quality: 80 })
      .toFile(`uploads/${folder}/${imageName}`)
      .then(() => deleteImageFromStorage(folder, [image.filename]))

    return imageName
  })
  return compressedImageNames
}

export const deleteImageFromStorage = (folder: string, images: string[]) => {
  images.forEach(image => unlinkSync(`uploads/${folder}/${image}`))
}