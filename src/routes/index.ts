import express from 'express'
import api from './api'

const router = express.Router()


// 기본적으로 api의 endpoint는 /api 로 시작함
router.use('/api', api)

export default router