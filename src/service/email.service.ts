import { transporter } from "../lib/email";

type EmailParams = {
    to:string,
    subject:string,
    text:string,
    html:string
}
export const sendMail = async (props : EmailParams) =>{
    const response = await transporter.sendMail({
        ...props
    })
    console.log(response);
}