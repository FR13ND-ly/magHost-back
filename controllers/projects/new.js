import Docker from "dockerode"
import path from "path"
import ProjectModel from "../../db/model.js"
import utils from "../../utils.js"

const docker = new Docker()

export default async (req, res, next) => {
    const data = req.body
    const newItem = new ProjectModel({
        name: data.name.replace(/ /g, "-"),
        path: data.name,
        index: data.index,
    })

    const savedItem = await newItem.save()

    const image = "nginx:latest"

    const projectPath = path.join(utils.dirname, `/pages/${newItem.path}`)
    const createOptions = {
        Image: image,
        HostConfig: {
            Binds: [`${projectPath}:/usr/share/nginx/html`],
            PortBindings: { "80/tcp": [{ HostPort: "0" }] },
        },
        name: newItem.name,
    }
    docker.createContainer(createOptions, (err, container) => {
        container.start()
    })

    res.status(200).json({
        name: newItem.name,
        message: "Project Succesfuly uploaded",
    })
}
