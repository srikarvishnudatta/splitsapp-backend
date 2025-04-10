import nodemailer from "nodemailer"
export const transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.EMAIL_ID!,
        pass:process.env.PASSWORD!
    }
});