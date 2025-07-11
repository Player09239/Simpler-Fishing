import { model, Schema } from 'mongoose'

const userSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cash: {
        type: Number,
        default: 0
    },
    inventory: {
        type: Array
    },
    equipped: {
        type: String,
        default: 'Starting Fishing Rod',
        required: true
    },
    catched: {
        type: Number,
        default: 0,
        required: true
    },
    isPremium: {
        type: Boolean,
        default: false
    }
})

export default model('User2', userSchema)
