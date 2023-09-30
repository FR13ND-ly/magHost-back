import ProjectModel from "../../db/model.js"
import fs from "fs"
import path from "path"
import utils from "../../utils.js"
import Docker from "dockerode"

const docker = new Docker()

async function deleteContainer(containerName) {
    const containers = await docker.listContainers({ all: true })
    const containerInfo = containers.find((container) =>
        container.Names.includes(`/${containerName}`)
    )
    const container = docker.getContainer(containerInfo.Id)

    await container.stop()
    await container.remove()
    console.log("container removed")
}

export default async (req, res, next) => {
    const projectId = req.params.id
    let deletedProject = await ProjectModel.findByIdAndDelete(projectId)
    fs.rmSync(path.join(utils.dirname, "/pages/", deletedProject.path), {
        recursive: true,
    })
    deleteContainer(deletedProject.name)
    res.status(204).send()
}
