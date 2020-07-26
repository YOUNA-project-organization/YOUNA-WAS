import { Document } from 'mongoose'
export interface ITest extends Document {
    email: string
    firstName: string
    lastName: string
}