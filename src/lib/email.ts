// lib/emailService.ts
import nodemailer from "nodemailer";

// Email configuration
const createTransporter = () => {
  // Configure based on your email provider
  // Example configurations for popular providers:

  // Gmail configuration
  if (process.env.EMAIL_PROVIDER === "gmail") {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // Use App Password for Gmail
      },
    });
  }

  // Outlook/Hotmail configuration
  if (process.env.EMAIL_PROVIDER === "outlook") {
    return nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // SMTP configuration (works with most providers)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Email templates
const getStatusEmailTemplate = (
  order: any,
  previousStatus: string,
  newStatus: string
) => {
  const statusMessages = {
    processing: {
      subject: "📦 Your order is being processed",
      message:
        "We have received your order and are now processing it. We will notify you once it ships.",
      color: "#f59e0b",
    },
    shipped: {
      subject: "🚚 Your order has shipped!",
      message:
        "Great news! Your order has been shipped and is on its way to you.",
      color: "#3b82f6",
    },
    delivered: {
      subject: "✅ Your order has been delivered",
      message:
        "Your order has been successfully delivered. We hope you enjoy your purchase!",
      color: "#10b981",
    },
    completed: {
      subject: "🎉 Order completed",
      message:
        "Your order has been completed successfully. Thank you for your business!",
      color: "#10b981",
    },
    cancelled: {
      subject: "❌ Your order has been cancelled",
      message:
        "Your order has been cancelled. If you have any questions, please contact our support team.",
      color: "#ef4444",
    },
    failed: {
      subject: "⚠️ Issue with your order",
      message:
        "There was an issue with your order. Our team will contact you shortly to resolve this.",
      color: "#ef4444",
    },
  };

  const statusInfo = statusMessages[
    newStatus as keyof typeof statusMessages
  ] || {
    subject: "Order status update",
    message: `Your order status has been updated to: ${newStatus}`,
    color: "#6b7280",
  };

  const orderTotal = order.total || 0;
  const itemsCount = order.items?.length || 0;
  const orderDate = new Date(order.createdAt).toLocaleDateString();

  return {
    subject: `${statusInfo.subject} - Order #${order._id.toString().slice(-8)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Status Update</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <div style="background: linear-gradient(135deg, ${
          statusInfo.color
        } 0%, ${
      statusInfo.color
    }dd 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 300;">Order Status Update</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Order #${order._id
            .toString()
            .slice(-8)}</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none;">
          
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: ${
              statusInfo.color
            }; margin-top: 0; font-size: 22px;">Hello ${
      order.user?.name || "Valued Customer"
    }!</h2>
            <p style="font-size: 16px; margin: 15px 0;">${
              statusInfo.message
            }</p>
            
            <div style="background: ${
              statusInfo.color
            }15; border-left: 4px solid ${
      statusInfo.color
    }; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
              <strong style="color: ${
                statusInfo.color
              }; text-transform: uppercase; font-size: 14px; letter-spacing: 0.5px;">
                Status: ${newStatus}
              </strong>
            </div>
          </div>

          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="margin-top: 0; color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Details</h3>
            
            <div style="display: grid; gap: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                <span style="color: #6b7280;">Order Date:</span>
                <strong>${orderDate}</strong>
              </div>
              
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                <span style="color: #6b7280;">Items:</span>
                <strong>${itemsCount} item${
      itemsCount !== 1 ? "s" : ""
    }</strong>
              </div>
              
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                <span style="color: #6b7280;">Total Amount:</span>
                <strong style="color: ${
                  statusInfo.color
                }; font-size: 18px;">$${orderTotal.toFixed(2)}</strong>
              </div>

              ${
                order.deliveryType
                  ? `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
                <span style="color: #6b7280;">Delivery Type:</span>
                <strong style="text-transform: capitalize;">${order.deliveryType}</strong>
              </div>
              `
                  : ""
              }
            </div>

            ${
              order.items && order.items.length > 0
                ? `
            <div style="margin-top: 20px;">
              <h4 style="color: #374151; margin-bottom: 10px;">Items Ordered:</h4>
              <div style="background: #f9fafb; padding: 15px; border-radius: 6px;">
                ${order.items
                  .map(
                    (item: any) => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <div>
                      <strong>${
                        item.product?.name || item.name || "Product"
                      }</strong>
                      <br>
                      <small style="color: #6b7280;">Qty: ${
                        item.quantity
                      }</small>
                    </div>
                    <strong>$${(
                      (item.price || 0) * (item.quantity || 1)
                    ).toFixed(2)}</strong>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
            `
                : ""
            }
          </div>

          ${
            newStatus === "shipped" && order.trackingNumber
              ? `
          <div style="background: #dbeafe; border: 1px solid #93c5fd; padding: 20px; border-radius: 8px; margin-top: 20px; text-align: center;">
            <h4 style="margin: 0 0 10px 0; color: #1d4ed8;">Tracking Information</h4>
            <p style="margin: 0; font-family: monospace; font-size: 16px; font-weight: bold; color: #1e40af;">${order.trackingNumber}</p>
          </div>
          `
              : ""
          }

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #6b7280; margin: 0;">
              Need help? <a href="mailto:${
                process.env.SUPPORT_EMAIL || process.env.EMAIL_USER
              }" style="color: ${
      statusInfo.color
    }; text-decoration: none;">Contact Support</a>
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">
              © ${new Date().getFullYear()} ${
      process.env.COMPANY_NAME || "Your Company"
    }. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Order Status Update - Order #${order._id.toString().slice(-8)}
      
      Hello ${order.user?.name || "Valued Customer"}!
      
      ${statusInfo.message}
      
      Order Details:
      - Order Date: ${orderDate}
      - Items: ${itemsCount} item${itemsCount !== 1 ? "s" : ""}
      - Total: $${orderTotal.toFixed(2)}
      - Status: ${newStatus.toUpperCase()}
      
      ${
        order.items && order.items.length > 0
          ? `
      Items Ordered:
      ${order.items
        .map(
          (item: any) =>
            `- ${item.product?.name || item.name || "Product"} (Qty: ${
              item.quantity
            }) - $${((item.price || 0) * (item.quantity || 1)).toFixed(2)}`
        )
        .join("\n")}
      `
          : ""
      }
      
      ${
        newStatus === "shipped" && order.trackingNumber
          ? `
      Tracking Number: ${order.trackingNumber}
      `
          : ""
      }
      
      Need help? Contact us at ${
        process.env.SUPPORT_EMAIL || process.env.EMAIL_USER
      }
      
      © ${new Date().getFullYear()} ${
      process.env.COMPANY_NAME || "Your Company"
    }
    `,
  };
};

// Main email sending function
export async function sendOrderStatusEmail({
  order,
  previousStatus,
  newStatus,
}: {
  order: any;
  previousStatus: string;
  newStatus: string;
}) {
  // Skip email if no user email or if email notifications are disabled
  if (
    !order.user?.email ||
    process.env.DISABLE_EMAIL_NOTIFICATIONS === "true"
  ) {
    console.log("Email notifications disabled or no user email found");
    return;
  }

  const transporter = createTransporter();
  const emailTemplate = getStatusEmailTemplate(
    order,
    previousStatus,
    newStatus
  );

  const mailOptions = {
    from: {
      name: process.env.COMPANY_NAME || "Your Store",
      address: process.env.EMAIL_USER || "noreply@example.com",
    },
    to: order.user.email,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
    text: emailTemplate.text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

// Function to send test email (useful for debugging)
export async function sendTestEmail(toEmail: string) {
  const transporter = createTransporter();

  const mailOptions = {
    from: {
      name: process.env.COMPANY_NAME || "Your Store",
      address: process.env.EMAIL_USER || "noreply@example.com",
    },
    to: toEmail,
    subject: "Test Email from Your Store",
    html: `
      <h1>Test Email</h1>
      <p>This is a test email to verify your email configuration is working correctly.</p>
      <p>Sent at: ${new Date().toISOString()}</p>
    `,
    text: `Test Email\n\nThis is a test email to verify your email configuration is working correctly.\n\nSent at: ${new Date().toISOString()}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Test email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending test email:", error);
    throw error;
  }
}
