import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  try {
    await transporter.sendMail({
      from: `"E-Commerce App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const emailTemplates = {
  orderStatusUpdate: (orderId: string, status: string) => `
    <div>
      <h2>Order Status Update</h2>
      <p>Your order #${orderId} has been updated to: ${status}</p>
      <p>Thank you for shopping with us!</p>
    </div>
  `,
  lowStockAlert: (productName: string, remainingStock: number) => `
    <div>
      <h2>Low Stock Alert</h2>
      <p>The product "${productName}" is running low on stock.</p>
      <p>Remaining stock: ${remainingStock}</p>
      <p>Please consider restocking soon.</p>
    </div>
  `,
};
