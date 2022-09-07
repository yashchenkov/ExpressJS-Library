import multer from 'multer';
import {nanoid} from 'nanoid';

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public')
    },
    filename(req, file, cb) {
        console.log('filename')
        console.log(file);
        //console.log(req);
        //req.file.fileBook = file.originalName;
        cb(null, `${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.originalname){
        file.originalname = nanoid();
        console.log('fileFilter')
        console.log(file);
        cb(null, true);
    }
}

export const stor = multer({storage, fileFilter});

