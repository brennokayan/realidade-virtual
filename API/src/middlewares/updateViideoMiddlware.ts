const multer = require('multer');

const storage =  multer.diskStorage({
    destination:(req:any, file:any, cb:any) => {
        cb(null, "uploads/videos/")
    },
filename: (req:any, file:any, cb:any) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-'); // Substitua os dois pontos por traços, pois eles são inválidos em nomes de arquivo
    cb(null, timestamp + "_" + file.originalname);
},
    
})


export const updateVideoMiddlware = multer({storage})
