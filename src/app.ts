import express from 'express'
import config from 'config'
import connect from './utils/connect'
import log from './utils/logger'
import routes from './routes'

const port = config.get<number>('port')


const app = express()



routes(app)


const start = async () => {
    await connect()
    app.listen(port, () => {
        log.info(`server started on port ${port}`)
    })
}

start()