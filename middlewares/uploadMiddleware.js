import multer from "multer"
import fs from "fs"
import path from "path"
import utils from "../utils.js"

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folderName = req.body.name
        let add_path = file.fieldname ?? ""
        const folderPath = path.join(
            utils.dirname,
            "pages/",
            folderName,
            add_path
        )
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true })
        }
        callback(null, folderPath)
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

const uploadMiddleware = (req, res, next) => {
    upload.any()(req, res, (err) => {
        next()
    })
}

export default uploadMiddleware
