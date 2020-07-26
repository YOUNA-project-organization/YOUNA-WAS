import mongoose, { Schema } from 'mongoose'
import { ITest } from './ModelTypes'

const TestSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
})

export default mongoose.model<ITest>('Test', TestSchema)