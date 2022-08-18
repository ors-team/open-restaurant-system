import { appendFileSync } from "fs";
import { cwd } from "process";
import { join } from "path";

export default function setEnv(name: string, value: string,) {
    process.env[name] = value
    appendFileSync(join(cwd(), ".env"), `\n${name}=${value}`)
}