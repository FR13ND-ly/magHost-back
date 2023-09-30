import mongoose from "./db.js"

const projectSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    path: String,
    index: String,
})

const ProjectModel = mongoose.model("ProjectModel", projectSchema)

export default ProjectModel
