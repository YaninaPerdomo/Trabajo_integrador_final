import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    let host = process.env.EMAIL_HOST;
    let port = process.env.EMAIL_PORT;
    let authUser = process.env.EMAIL_USER;
    let authPass = process.env.EMAIL_PASS;

    // Si el usuario aún tiene los valores de prueba por defecto, generamos una cuenta Ethereal real al vuelo
    if (authUser === 'tu_usuario_ethereal') {
        console.log('Generando cuenta de prueba de Ethereal automáticamente...');
        const testAccount = await nodemailer.createTestAccount();
        host = 'smtp.ethereal.email';
        port = 587;
        authUser = testAccount.user;
        authPass = testAccount.pass;
        
        // Lo guardamos en memoria para que no vuelva a generarlo en cada envío
        process.env.EMAIL_USER = authUser;
        process.env.EMAIL_PASS = authPass;
    }

    let transporterConfig;

    if (host === 'smtp.gmail.com') {
        transporterConfig = {
            service: 'gmail',
            auth: {
                user: authUser,
                pass: authPass.replace(/\s/g, '') // Elimina espacios si los hay
            }
        };
    } else {
        transporterConfig = {
            host: host,
            port: port,
            secure: port == 465 || port == '465',
            auth: {
                user: authUser,
                pass: authPass
            }
        };
    }

    const transporter = nodemailer.createTransport(transporterConfig);

    const message = {
        from: `Event Planner <${authUser}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    const info = await transporter.sendMail(message);

    console.log('Mensaje enviado: %s', info.messageId);
    
    // Si usas Ethereal (para pruebas), esto mostrará la URL donde puedes ver el correo
    if (process.env.EMAIL_HOST?.includes('ethereal')) {
        console.log('Url del correo (Ethereal): %s', nodemailer.getTestMessageUrl(info));
    }
};

export default sendEmail;
