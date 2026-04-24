/**
 * Script de migración para inyectar canales de debate al workspace "Debates y Apoyo".
 * Ejecutar con: node seed_channels.js
 * Desde la carpeta backend.
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const CHANNELS = [
    {
        name: 'diagnostico-y-deteccion',
        description: '¿Se está diagnosticando más o mejor el TEA? Diferencias entre infancia vs adultos. Subdiagnóstico en mujeres.'
    },
    {
        name: 'educacion',
        description: '¿Inclusión en escuela común o espacios especializados? Adaptaciones reales vs "inclusión de papel". Rol del docente sin formación en TEA.'
    },
    {
        name: 'familia-y-entorno',
        description: 'Sobreprotección vs autonomía. Cómo acompañar sin invadir. Impacto en hermanos.'
    },
    {
        name: 'trabajo-e-independencia',
        description: '¿Las empresas realmente incluyen o es marketing? Tipos de trabajos donde personas con TEA destacan. Preparación para vida adulta.'
    },
    {
        name: 'terapias-y-enfoques',
        description: 'Debate sobre ABA. Terapias alternativas vs basadas en evidencia. Medicación: cuándo sí y cuándo no.'
    },
    {
        name: 'tecnologia-y-apps',
        description: '¿Las apps ayudan o reemplazan interacción real? Herramientas de comunicación aumentativa. Inteligencia artificial y diagnóstico.'
    },
    {
        name: 'neurodiversidad',
        description: '¿El autismo es una discapacidad o una diferencia? Identidad y activismo. Lenguaje correcto.'
    },
    {
        name: 'vida-diaria',
        description: 'Rutinas, alimentación selectiva, sensibilidad sensorial. Experiencias personales y estrategias.'
    }
];

async function seedChannels() {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/autismo-recursos';
        console.log('Conectando a MongoDB...');
        await mongoose.connect(uri);
        console.log('Conectado.');

        const db = mongoose.connection.db;
        const workspacesCol = db.collection('workspaces');

        // Buscar el workspace "Debates y Apoyo"
        const workspace = await workspacesCol.findOne({ name: { $regex: /debates/i } });
        
        if (!workspace) {
            console.log('❌ No se encontró un workspace con nombre que contenga "Debates".');
            console.log('\nWorkspaces disponibles:');
            const all = await workspacesCol.find({}, { projection: { name: 1 } }).toArray();
            all.forEach(ws => console.log(`  - ${ws.name} (${ws._id})`));
            process.exit(1);
        }

        console.log(`✅ Workspace encontrado: "${workspace.name}" (ID: ${workspace._id})`);
        console.log(`   Canales actuales: ${workspace.channels?.length || 0}`);

        if (workspace.channels && workspace.channels.length > 0) {
            console.log('\n⚠️  Este workspace ya tiene canales:');
            workspace.channels.forEach(ch => console.log(`   # ${ch.name}`));
            console.log('\n¿Deseas reemplazarlos? Ejecuta con: node seed_channels.js --force');
            
            if (!process.argv.includes('--force')) {
                process.exit(0);
            }
            console.log('\n🔄 Modo --force: reemplazando canales existentes...');
        }

        // Asignar ObjectIds a cada canal para que Mongoose los use como subdocuments
        const channelsWithIds = CHANNELS.map(ch => ({
            _id: new mongoose.Types.ObjectId(),
            ...ch
        }));

        const result = await workspacesCol.updateOne(
            { _id: workspace._id },
            { $set: { channels: channelsWithIds } }
        );

        if (result.modifiedCount === 1) {
            console.log(`\n🎉 ¡Listo! Se inyectaron ${CHANNELS.length} canales al workspace "${workspace.name}":`);
            channelsWithIds.forEach(ch => console.log(`   # ${ch.name} — ${ch.description.substring(0, 60)}...`));
        } else {
            console.log('⚠️  No se modificó ningún documento.');
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

seedChannels();
