import { Document } from 'mongoose'

// Model들의 타입을 전역 인터페이스로 맞추어주어서
// 타입을 정적으로 고정해줍니다. 

export interface ITest extends Document {
    email: string
    firstName: string
    lastName: string
}