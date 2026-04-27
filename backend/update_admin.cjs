const mongoose = require('mongoose');

async function updateAdmin() {
  const uri = 'mongodb+srv://yperdomo:gerardo76@cluster0.4iwyreu.mongodb.net/autismo-recursos?retryWrites=true&w=majority&appName=Cluster0';
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  
  const result = await db.collection('usuarios').updateOne(
    { email: 'yabepe78@gmail.com' },
    { $set: { email: 'yanyperdomo@gmail.com' } }
  );
  
  console.log('Documentos actualizados:', result.modifiedCount);
  await mongoose.disconnect();
}

updateAdmin().catch(console.error);
