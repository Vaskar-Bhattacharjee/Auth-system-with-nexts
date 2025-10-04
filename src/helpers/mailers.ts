import nodemailer from 'nodemailer';
import User from '@/model/usermodel';
import bcrypt from 'bcrypt';

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        const verifyToken = await bcrypt.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findOneAndUpdate(
                userId,
                { verifyToken,
                verifyTokenExpiry: Date.now() + 3600000  // 1 hour expiry
                },
            
                { new: true }
            )}else if (emailType === "RESET") {
              User.findOneAndUpdate(
                userId,     
                {
                    forgetPasswordToken: verifyToken,
                    forgetPasswordTokenExpiry: Date.now() + 3600000  // 1 hour expiry
                },
                { new: true
                }
              )  
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587", 10), // Ensure port is a number
            auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
            },
        });

        const mailOptions = {
            from: 'vaskarbhattacharjee03@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: "<p></p>",
        };
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: unknown) {
        throw new Error("Error sending email" + error);
    }
}

