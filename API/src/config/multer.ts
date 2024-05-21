import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const MulterConfig = {
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
        },filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err, file.originalname);
                const filename = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, filename);
            });
        }
    }),
    limits: {
        fileSize: 500 * 1024 * 1024,
    },
    fileFilter: (_req: any, file: any, cb: any) => {
        const allowedMimes = [
            'video/mp4',
            'video/mpeg',
            'video/ogg',
            'video/quicktime',
            'video/webm',
            'video/x-ms-wmv',
            'video/x-flv',
            'video/3gpp',
            'video/3gpp2',
            'video/avi',
            'video/x-msvideo',
            'video/x-matroska',
            'video/mp2t',
            'video/mp2p',
            'video/mp2t',
            'video/mp2p',
            'video/3gpp',
            'video/3gpp2',
            'video/avi',
            'video/x-msvideo',
            'video/x-matroska',
            'video/mp2t',
            'video/mp2p',
            'video/mp2t',
            'video/mp2p',
            'video/3gpp',
            'video/3gpp2',
            'video/avi',
            'video/x-msvideo',
            'video/x-matroska',
            'video/mp2t',
            'video/mp2p',
            'video/mp2t',
            'video/mp2p',
            'video/3gpp',
            'video/3gpp2',
            'video/avi',
            'video/x-msvideo',
            'video/x-matroska',
            'video/mp2t',
            'video/mp2p',
            'video/mp2t',
            'video/mp2p',
            'video/3gpp',
            'video/3gpp2',
            'video/avi',
            'video/x-msvideo',
            'video/x-matroska',
            'video/mp2t',
            'video/mp2p',
            'video/mp2t',
            'video/mp2p',
            'video/3gpp',
            'video/3gpp2',
            'video/avi',
            'video/x-msvideo',
            'video/x-matroska',
            'video/mp2t',
            'video/mp2p',
            'video/mp2t',
            'video/mp2p',
            'video/3gpp',
            'video/3gpp2',
            'video/avi',
            'video/x-msvideo',
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }
        else{
            cb(new Error('Invalid file type.'));
        }
    }
}