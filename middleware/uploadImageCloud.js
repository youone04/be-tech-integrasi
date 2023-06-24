import multer from "multer";
import path from "path";

const UploadImageCloud = multer({
  storage: multer.diskStorage({
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      let extAllow = [".jpg", ".jpeg", ".png"];
      if (!extAllow.includes(ext)) {
        cb(new Error("File Type is Not Suport"));
        return;
      }
      cb(null, true);
    },
    filename: (req, file, cb) => {
        const nameImage = file.originalname.split('.');
      cb(
        null,
        nameImage[0] + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  
  }),
});

export default UploadImageCloud;