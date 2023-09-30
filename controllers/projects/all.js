import ProjectModel from "../../db/model.js"

export default async (req, res, next) => {
    let projects = await ProjectModel.find({}).exec()
    res.status(200).json({
        projects,
    })
}
