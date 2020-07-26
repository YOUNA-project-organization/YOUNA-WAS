import express, { Request, Response } from 'express'
import { testController } from '../controllers/test'
const router = express.Router()


// 단순 테스트를 위한 api
router.get('/test', testController)

export default router