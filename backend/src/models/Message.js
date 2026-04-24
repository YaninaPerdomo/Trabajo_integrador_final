import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace.channels' // Note: This is conceptual, Mongoose doesn't strictly enforce subdocument refs in the same way, but it's useful for documentation. We'll query by this ID.
    },
    content: {
        type: String,
        required: [true, 'El mensaje no puede estar vacío']
    }
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
