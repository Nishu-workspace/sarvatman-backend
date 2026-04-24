// import nodemailer from "nodemailer";

// const sendEmail = async (options) => {
//     // Use generic Gmail SMTP settings by default
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.EMAIL_USER || "your-email@gmail.com",
//             pass: process.env.EMAIL_PASS || "your-app-password",
//         },
//     });

//     const message = {
//         from: `${process.env.FROM_NAME || "Sarvatman"} <${process.env.FROM_EMAIL || process.env.EMAIL_USER || "your-email@gmail.com"}>`,
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//         html: options.html,
//     };

//     await transporter.sendMail(message);
// };

// export default sendEmail;
