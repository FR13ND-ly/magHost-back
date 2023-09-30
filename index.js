import express from "express"
import httpModule from "http"
import cors from "cors"
import bodyParser from "body-parser"
import uploadMiddleware from "./middlewares/uploadMiddleware.js"

import projectsController from "./controllers/projects/projects.js"

const app = express()
const http = httpModule.Server(app)

app.use(cors())
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/projects/all/", projectsController.all)
app.post("/projects/new/", uploadMiddleware, projectsController.newProject)

app.get("/projects/delete/:id/", projectsController.deleteProject)

app.use("/", projectsController.get)

http.listen(5000, () => {
    console.log("Listening on port 5000")
})
