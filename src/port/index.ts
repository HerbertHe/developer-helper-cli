import net from "net"
import { logError, logSuccess } from "../utils/log"

/**
 * generateAvailablePort
 * @returns
 */
export const generateAvailablePort = (): Promise<number> => {
    return new Promise((res) => {
        const server = net.createServer()
        server.listen(0, () => {
            const port = (server.address() as net.AddressInfo).port
            server.close()
            res(port)
        })
    })
}

/**
 * checkIfPortAvailable
 * @param port
 */
export const checkIfPortAvailable = (port: number) => {
    const server = net.createServer().listen(port)

    server.on("listening", () => {
        server.close()
        logSuccess(`Port: ${port} is available!`, "Port")
    })

    server.on("error", () => {
        server.close()
        logError(`Port: ${port} is not available!`)
    })
}
