import resend from "../lib/email"
import nodemailer from "nodemailer"

type EmailParams = {
    to:string,
    subject:string,
    text:string,
    html:string
}

export const sendEmail = (
{to, subject, text, html}: EmailParams
) =>{
    console.log(to);
    resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject,
        text, 
        html});
}

const transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"app.splits.srikar@gmail.com",
        pass:"acnj ohnf hzjw ctmd"
    }
});

export const sendMail = async (props : EmailParams) =>{
    const response = await transporter.sendMail({
        ...props
    })
    console.log(response);
}