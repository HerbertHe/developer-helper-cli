import path from "path"
import Koa from "koa"
import server from "koa-static"

import { logTask } from "../utils/log"

export const runStaticServer = (p: string, dir?: string) => {
    const app = new Koa()
    const s = server(path.resolve() + `${!!dir ? dir : ""}`)
    app.use(s)
    
    const port = parseInt(p) || 3000
    app.listen(port, () => {
        logTask(`Static server is running at:\nhttp://127.0.0.1:${port}`)
    })
}
