import express from 'express';
import router from './routes'
import cors from 'cors'
import logger from 'morgan'
import morgan from 'morgan';
import fs from 'fs'
import { ENV_TYPE } from './types/types'
import './database/mongoose'


// 현재 서버가 개발 모드인지 프로덕션 모드인지 구분하는 변수를 담는다
export const env: ENV_TYPE = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'production' : 'development'
const PORT = 5000
const app: express.Application = express()


app.use(cors())


if (env == 'production') {
    // 배포모드라면 서버에 찍히는 로그들을 access_production.log 라는 이름의 파일에다가 담아주고
    app.use(logger('common', {
        stream: fs.createWriteStream('./access_production.log', { flags: 'a' })
    }))

} else {
    // 개발모드라면 서버에 찍히는 로그들을 access_development.log 라는 이름의 파일에다가 담아준다
    app.use(logger('common', {
        stream: fs.createWriteStream('./access_development.log', { flags: 'a' })
    }))
    // 개발모드일때 서버에 찍히는 로그들을 간단하게 터미널에 찍어준다. 
    app.use(morgan('dev'))
}
app.use('/', router)

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))