import mongoose, { mongo } from "mongoose";
import config from 'config'
import log from "./logger";

async function connect() {
    const dbUri = config.get<string>('dbUri')

    try {
        await mongoose.connect(dbUri)
        log.info(`Database Connected`)
    } catch (error) {
        log.error(`Database Connection Error:`)
        process.exit(1)
    }
}

export default connect