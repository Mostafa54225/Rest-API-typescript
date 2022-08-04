import express from 'express'
import config from 'config'
import connect from './utils/connect'
import log from './utils/logger'
import routes from './routes'
import { errorHandler } from './middleware/errorHandler'
import { deserializeUser } from './middleware/deserializeUser'
import cookieParser from 'cookie-parser'
const port = config.get<number>('port')


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(deserializeUser)

routes(app)


app.use(errorHandler)

const start = async () => {
    await connect()
    app.listen(port, () => {
        log.info(`server started on port ${port}`)
    })
}

start()