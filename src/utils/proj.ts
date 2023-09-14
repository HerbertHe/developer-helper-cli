import fs from "fs"
import path from "path"

// 工程项目情况识别
// 工程类型、包管理器
export const detectProj = () => {
    const dir = fs.readdirSync(path.resolve())
    // 工程类型检测
    if(dir.includes("package.json")) {
        // nodejs 工程
        if (dir.includes("pnpm-lock.yaml")) {
            return ["nodejs", "pnpm"]
        } else if (dir.includes("yarn.lock")) {
            return ["nodejs", "yarn"]
        } else {
            return ["nodejs", "npm"]
        }
    } else if (dir.includes("go.mod")) {
        return ["go", "go"]
    } else if (dir.includes("Cargo.toml")) {
        return ["rust", "cargo"]
    }

    return ["", ""]
}
