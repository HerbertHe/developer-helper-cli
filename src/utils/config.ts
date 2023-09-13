import fs from "fs"
import path from "path"

export const readConfig = () => {
    const dir = fs.readdirSync(path.resolve())

    if (!dir.includes("dhc.config.json")) {
        return {}
    }

    const cfg = fs
        .readFileSync(path.join(path.resolve(), "dhc.config.json"))
        .toString()

    return JSON.parse(cfg)
}
