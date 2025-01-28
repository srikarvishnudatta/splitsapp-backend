import resend from "../lib/email"

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