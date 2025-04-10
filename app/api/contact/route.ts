import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
	try {
		const { firstName, lastName, email, phone, message } =
			await request.json();

		// Validate required fields
		if (!firstName || !lastName || !email || !phone) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Check if environment variables are set
		if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
			console.error("Missing email configuration");
			return NextResponse.json(
				{ error: "Server configuration error" },
				{ status: 500 }
			);
		}

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_USER,
			subject: "New Contact Form Submission - SolarLeveling",
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${firstName} ${lastName}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Phone:</strong> ${phone}</p>
				${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
			`,
		};

		await transporter.sendMail(mailOptions);

		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending email:", error);

		// Provide more specific error messages based on the error type
		let errorMessage = "Failed to send email";
		if (error instanceof Error) {
			if (error.message.includes("EAUTH")) {
				errorMessage =
					"Email authentication failed. Please check your email credentials.";
			} else if (error.message.includes("ECONNREFUSED")) {
				errorMessage = "Could not connect to the email server.";
			}
		}

		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
