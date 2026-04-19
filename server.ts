import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/notify-admin", async (req, res) => {
    const { name, phone, location } = req.body;

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials missing. Skipping email notification.");
      return res.status(200).json({ status: "skipped", message: "SMTP not configured" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"SaiBalaji Booking" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || "saibalajitours11@gmail.com",
        subject: `New Booking: ${name} to ${location}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
            <h2 style="color: #f59e0b;">New Travel Booking Received</h2>
            <p>A new booking has been submitted through the website.</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p><strong>User Name:</strong> ${name}</p>
            <p><strong>Contact Number:</strong> ${phone}</p>
            <p><strong>Destination:</strong> ${location}</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #666;">This is an automated notification from SaiBalaji Tours and Travelers.</p>
          </div>
        `,
      });
      res.json({ status: "success" });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ status: "error", error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
