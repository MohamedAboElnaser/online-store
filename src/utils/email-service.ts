import nodemailer from "nodemailer";

class Email {
    private to: string;
    private subject: string;
    private message: string;

    constructor(to: string, subject: string, message: string) {
        this.to = to;
        this.subject = subject;
        this.message = message;
    }

    private getTransporter(): nodemailer.Transporter {
        if (process.env.NODE_ENV === "production") {
            return nodemailer.createTransport({
                host: process.env.SendinBlue_HOST,
                port: Number(process.env.SendinBlue_PORT),
                secure: false,
                auth: {
                    user: process.env.SendinBlue_USER,
                    pass: process.env.SendinBlue_PASSWORD,
                },
            });
        } else {
            return nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
        }
    }

    public async send(): Promise<void> {
        try {
            const transporter = this.getTransporter();
            await this.getTransporter().sendMail({
                from: process.env.EMAIL_FROM,
                to: this.to,
                subject: this.subject,
                text: this.message,
            });
        } catch (err) {
            console.log("Error of email service", err);
            throw new Error(`Error occurred while sending email: ${err}`);
        }
    }
}

export default Email;
