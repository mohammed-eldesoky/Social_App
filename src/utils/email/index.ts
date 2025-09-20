import nodemailer from "nodemailer"

interface IEmail{
    to:string,
    subject:string,
    html:string
}


export const sendEmail=  async  ({to,subject,html}:IEmail) => {
// step:1 // create a transporter
const transporter =  nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 587,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS 
    },

});
// step:2 // send email
await transporter.sendMail({
from:"Social App",
to,
subject,
html,

})

}

