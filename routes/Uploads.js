const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const router = module.exports = require('express').Router();

const s3 = new aws.S3({
    apiVersion: "2006-03-01",
    region: "us-east-2",
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY
    }
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET,
        key: (request, file, next) => {
            next(null, `files/${Date.now()}_${file.originalname}`);
        }
    })
});


router.post("/", upload.single("image"), (req, res) => {
    res.status(200).json(req.file);
});