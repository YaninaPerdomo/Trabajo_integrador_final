import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del workspace es obligatorio'],
        trim: true
    },
    description: {
        type: String
    },
    topic: {
        type: String,
        default: 'Información General'
    },
    visibility: {
        type: String,
        enum: ['público', 'privado'],
        default: 'público'
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    resources: [{
        title: String,
        url: String,
        content: String
    }],
    channels: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        }
    }],
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['propietario', 'usuario'],
            default: 'usuario'
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    collection: 'workspaces'
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;
