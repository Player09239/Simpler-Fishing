import { model, Schema } from 'mongoose'

const botSchema = new Schema({
    botId: {
        type: String,
        default: '1389387486035443714',
        required: true
    },
    prefix: {
        type: String,
        default: 'f!',
        required: true
    },
    stats: {
        msgs: {
            type: Number,
            default: 0
        },
        cmds: {
            type: Number,
            default: 0
        }
    }
})

export default model('Bot2', botSchema)