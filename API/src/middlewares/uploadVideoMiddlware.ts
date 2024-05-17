import multer from 'multer';
import path from 'path';

export const videoUploaderMiddleware =  multer({
    storage: multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, "uploads/")
        },
        filename: (req, file,cb) =>{
            cb(null, Date.now().toString() + "_"+file.originalname);
        }
        
    }),
    fileFilter: (req, file, cb) => {
      const extensaoVideo =   ["vide/mp4", "video/mkv, video/pdf"].find((formatoAceito)=> {
        (formatoAceito === file.mimetype)
      })
        if(extensaoVideo){
            return cb(null, true)
        }
        return cb(null, false)
    }
})