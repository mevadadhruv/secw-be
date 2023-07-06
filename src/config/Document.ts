import {S3Client} from "@aws-sdk/client-s3";
import {config} from "../config/env";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

const Documentconfig = {
    region : config.REGION,
    credentials : {
        accessKeyId : config.ACCESS_KEY_ID,
        secretAccessKey: config.SECRET_KEY_ACCESS
    }
}

const s3 = new S3Client(Documentconfig);

const upload = (bucketName:string) => multer({
    storage: multerS3({
        s3,
        acl: 'public-read-write',
        bucket: bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata : (req,file,cb) => {
            cb(null,{fieldname : file.fieldname});
        },
        key: (req, file, cb) => {   
            const fileName = `${Date.now()}_${Math.round(Math.random() * 26)}`;
            cb(null, `${fileName}${path.extname(file.originalname)}`);
        }
    })
});

export default upload;