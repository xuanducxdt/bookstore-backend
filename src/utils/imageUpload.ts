/* eslint-disable linebreak-style */
import multer from 'multer';
import path from 'path';

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: path.join(__dirname, '../public/images/book/'),
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

export const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 5000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req: any, file: any, cb: any): any {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'));
    }
    return cb(undefined, true);
  },
});
