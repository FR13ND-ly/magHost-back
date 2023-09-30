import httpProxy from "http-proxy"
import Docker from "dockerode"
import ProjectModel from "../../db/model.js"

const docker = new Docker()
const proxy = httpProxy.createProxyServer({})

export default async (req, res) => {
    let urlParts = req.hostname.split(".")
    if (urlParts.length > 1) {
        let subdomain = urlParts[0]
        const project = await ProjectModel.findOne({ name: subdomain })
        console.log(urlParts, project)
        if (!project) res.send("Not found")
        docker.getContainer(project.name).inspect((err, containerInfo) => {
            const portMapping =
                containerInfo.NetworkSettings.Ports["80/tcp"][0].HostPort
            proxy.web(req, res, { target: `http://localhost:${portMapping}` })
        })
    } else {
        res.redirect("http://localhost:4200/")
    }
}
