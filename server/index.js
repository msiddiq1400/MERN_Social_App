import express from "express"
import bodyParser from "body-parser" //pricess the req body
import mongoose from "mongoose"
import cors from "cors" //cross origin requests
import dotenv from "dotenv"
import multer from "multer" //for file storage
import helmet from "helmet" //request saftey
import morgan from "morgan" //logging
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'
import { register } from "./controller/auth.js"
import { verifyToken } from "./middleware/auth.js"
import { createPost } from "./controller/posts.js"

/* CONFIGURATIONS */
//below two for when using "type:module" inside package.json
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config();
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

//set directory where to keep images locally
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

/* ROUTES WITH FILES */
//need the upload here so cant put with other routes
app.post('/auth/register', upload.single("picture"), register)
app.post('/posts', verifyToken, upload.single("picture"), createPost)

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    dbName: 'social',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port ${PORT}`))
}).catch((err) => console.log(`${err} did not connect`))

