"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formErrors, setFormErrors] = useState({
		email: "",
		phone: "",
	});

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePhone = (phone: string) => {
		// Allow formats like: (123) 456-7890, 123-456-7890, 1234567890
		const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		return phoneRegex.test(phone);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "email" && value) {
			if (!validateEmail(value)) {
				setFormErrors((prev) => ({
					...prev,
					email: "Please enter a valid email address",
				}));
			} else {
				setFormErrors((prev) => ({ ...prev, email: "" }));
			}
		}

		if (name === "phone" && value) {
			if (!validatePhone(value)) {
				setFormErrors((prev) => ({
					...prev,
					phone: "Please enter a valid phone number",
				}));
			} else {
				setFormErrors((prev) => ({ ...prev, phone: "" }));
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		// Validate form before submission
		const email = formData.get("email") as string;
		const phone = formData.get("phone") as string;

		let hasErrors = false;

		if (!validateEmail(email)) {
			setFormErrors((prev) => ({
				...prev,
				email: "Please enter a valid email address",
			}));
			hasErrors = true;
		}

		if (!validatePhone(phone)) {
			setFormErrors((prev) => ({
				...prev,
				phone: "Please enter a valid phone number",
			}));
			hasErrors = true;
		}

		if (hasErrors) {
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(Object.fromEntries(formData)),
			});

			if (response.ok) {
				setSubmitted(true);
			} else {
				// Handle error - show error message to the user
				const errorData = await response.json();
				setError(
					errorData.error ||
						"Form submission failed. Please try again."
				);
				console.error("Form submission failed:", errorData);
			}
		} catch (error) {
			setError(
				"An error occurred while submitting the form. Please try again."
			);
			console.error("Error submitting form:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id="contact" className="py-16">
			<div className="container">
				<div className="flex flex-col gap-8">
					<div className="text-center space-y-4">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Ready to Own Your Energy?
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
							Speak with one of our experts today!
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:gap-12">
						<Card>
							<CardHeader>
								<CardTitle>Schedule a Consultation</CardTitle>
								<CardDescription>
									Fill out the form below and we'll get back
									to you within 24 hours.
								</CardDescription>
							</CardHeader>
							{!submitted ? (
								<form onSubmit={handleSubmit}>
									<CardContent className="space-y-4">
										<div className="grid gap-4 sm:grid-cols-2">
											<div className="space-y-2">
												<Label htmlFor="firstName">
													First Name
												</Label>
												<Input
													id="firstName"
													name="firstName"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="lastName">
													Last Name
												</Label>
												<Input
													id="lastName"
													name="lastName"
													required
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												name="email"
												type="email"
												required
												onBlur={handleBlur}
												className={
													formErrors.email
														? "border-red-500 focus-visible:ring-red-500"
														: ""
												}
											/>
											{formErrors.email && (
												<p className="text-sm text-red-500 mt-1">
													{formErrors.email}
												</p>
											)}
										</div>
										<div className="space-y-2">
											<Label htmlFor="phone">
												Phone Number
											</Label>
											<Input
												id="phone"
												name="phone"
												type="tel"
												required
												onBlur={handleBlur}
												className={
													formErrors.phone
														? "border-red-500 focus-visible:ring-red-500"
														: ""
												}
												placeholder="(123) 456-7890"
											/>
											<p className="text-xs text-muted-foreground">
												Format: (123) 456-7890,
												123-456-7890, or 1234567890
											</p>
											{formErrors.phone && (
												<p className="text-sm text-red-500 mt-1">
													{formErrors.phone}
												</p>
											)}
										</div>
										<div className="space-y-2">
											<Label htmlFor="message">
												Message (Optional)
											</Label>
											<Textarea
												id="message"
												name="message"
											/>
										</div>
									</CardContent>
									<CardFooter className="flex flex-col gap-4">
										{error && (
											<div className="w-full p-3 text-sm text-red-500 bg-red-50 rounded-md">
												{error}
											</div>
										)}
										<Button
											type="submit"
											className="w-full"
											disabled={isSubmitting}
										>
											{isSubmitting ? (
												<>
													<span className="mr-2">
														Sending
													</span>
													<div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
												</>
											) : (
												"Submit"
											)}
										</Button>
									</CardFooter>
								</form>
							) : (
								<CardContent className="p-6 text-center">
									<div className="flex flex-col items-center gap-4">
										<CheckCircle2 className="h-16 w-16 text-green-500" />
										<h3 className="text-2xl font-bold">
											Thank You!
										</h3>
										<p className="text-muted-foreground">
											Your request has been submitted. One
											of our solar experts will contact
											you shortly.
										</p>
									</div>
								</CardContent>
							)}
						</Card>

						<div className="flex flex-col justify-center gap-8">
							<div className="space-y-4">
								<h3 className="text-2xl font-bold">
									Contact Us Directly
								</h3>
								<p className="text-muted-foreground">
									Prefer to speak with someone right away?
									Reach out to us using the contact
									information below.
								</p>

								<div className="flex items-center gap-4 mt-6">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
										<Phone className="h-6 w-6 text-primary" />
									</div>
									<div>
										<p className="font-medium">Call Us</p>
										<a
											href="tel:+18005551234"
											className="text-xl font-bold hover:underline"
										>
											(346) 295-2884
										</a>
									</div>
								</div>

								<div className="flex items-center gap-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
										<Mail className="h-6 w-6 text-primary" />
									</div>
									<div>
										<p className="font-medium">Email Us</p>
										<a
											href="mailto:solarlevelingg@gmail.com"
											className="text-xl font-bold hover:underline"
										>
											solarlevelingg@gmail.com
										</a>
									</div>
								</div>
							</div>

							<Card>
								<CardContent className="p-6">
									<div className="space-y-2">
										<h4 className="font-bold">
											Business Hours
										</h4>
										<div className="grid grid-cols-2 gap-1 text-sm">
											<span>Monday - Friday:</span>
											<span>8:00 AM - 8:00 PM</span>
											<span>Saturday:</span>
											<span>9:00 AM - 5:00 PM</span>
											<span>Sunday:</span>
											<span>Closed</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
