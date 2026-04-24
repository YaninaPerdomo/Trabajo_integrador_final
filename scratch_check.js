import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });

const workspaceSchema = new mongoose.Schema({
    name: String,
    description: String
}, { collection: 'workspaces' });

const Workspace = mongoose.model('Workspace', workspaceSchema);

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const workspaces = await Workspace.find({}, 'name description').lean();
        console.log('Workspaces:', workspaces);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
