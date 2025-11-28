import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const ensureMailerConfig = () => {
  const required = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "CONTACT_RECIPIENT",
  ];

  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing SMTP configuration values: ${missing.join(", ")}`);
  }
};

let transporter;
const getTransporter = () => {
  if (transporter) return transporter;
  ensureMailerConfig();

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
};

const buildHtmlMessage = ({ name, email, message }) => `
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Message:</strong></p>
  <p>${message.replace(/\n/g, "<br/>")}</p>
`;

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  try {
    const mailer = getTransporter();

    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;
    const recipient = process.env.CONTACT_RECIPIENT;

    // Notify admin/support mailbox
    await mailer.sendMail({
      from: fromAddress,
      to: recipient,
      replyTo: email,
      subject: `MoodTrack Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: buildHtmlMessage({ name, email, message }),
    });

    // Optional acknowledgement to sender if enabled
    if (process.env.SEND_CONTACT_ACK === "true") {
      await mailer.sendMail({
        from: fromAddress,
        to: email,
        subject: "Thanks for contacting MoodTrack",
        text: `Hi ${name},\n\nThanks for reaching out! We've received your message and will get back to you soon.\n\nTake care,\nThe MoodTrack Team`,
      });
    }

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form mail error:", error);
    const safeMessage =
      error?.message?.includes("Missing SMTP")
        ? error.message
        : "We couldn't send your message right now. Please try again later.";
    return res.status(500).json({ message: safeMessage });
  }
});

export default router;
