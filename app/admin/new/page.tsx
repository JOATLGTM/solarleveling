"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/rich-text-editor";

export default function NewPostPage() {
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
			setImageUrl(""); // Clear the URL input when a file is selected

			// Create a preview URL for the image
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImageUrl(e.target.value);
		if (e.target.value) {
			setImageFile(null);
			setImagePreview(null);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			let finalImageUrl = imageUrl;

			// If a file was uploaded, upload it to Firebase Storage
			if (imageFile) {
				const storageRef = ref(
					storage,
					`blog-images/${Date.now()}-${imageFile.name}`
				);
				await uploadBytes(storageRef, imageFile);

				// Get the download URL from Firebase Storage
				finalImageUrl = await getDownloadURL(storageRef);
			}

			// Create the blog post data
			const blogData = {
				title,
				content,
				imageUrl: finalImageUrl,
				createdAt: new Date().toISOString(),
			};

			// Store the blog post in Firebase Realtime Database
			const dbUrl =
				process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
				"https://solarleveling-d3008-default-rtdb.firebaseio.com";
			const response = await fetch(`${dbUrl}/blog-posts.json`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(blogData),
			});

			if (!response.ok) {
				throw new Error("Failed to store blog post in database");
			}

			router.push("/admin");
		} catch (err) {
			console.error("Error creating post:", err);
			setError("Failed to create blog post");
			setLoading(false);
		}
	};

	return (
		<div className="container py-12">
			<div className="max-w-2xl mx-auto">
				<div className="mb-8">
					<Link
						href="/admin"
						className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Admin
					</Link>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Create New Blog Post</CardTitle>
						<CardDescription>
							Fill in the details below to create a new blog post.
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-4">
							{error && (
								<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
									{error}
								</div>
							)}

							<div className="space-y-2">
								<Label htmlFor="title">Title</Label>
								<Input
									id="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder="Enter post title"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="image">Image</Label>
								<div className="flex flex-col gap-4">
									<div className="flex items-center gap-2">
										<Button
											type="button"
											variant="outline"
											onClick={() =>
												fileInputRef.current?.click()
											}
											className="w-full"
										>
											<Upload className="mr-2 h-4 w-4" />
											Upload Image
										</Button>
										<input
											type="file"
											ref={fileInputRef}
											onChange={handleImageChange}
											accept="image/*"
											className="hidden"
										/>
									</div>

									<div className="relative">
										<Input
											id="imageUrl"
											value={imageUrl}
											onChange={handleUrlChange}
											placeholder="Or enter image URL"
											className="pr-10"
										/>
										<ImageIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									</div>

									{imagePreview && (
										<div className="mt-2 border rounded-md overflow-hidden">
											<img
												src={imagePreview}
												alt="Preview"
												className="max-h-48 w-auto mx-auto"
											/>
										</div>
									)}
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="content">Content</Label>
								<RichTextEditor
									content={content}
									onChange={setContent}
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button type="submit" disabled={loading}>
								{loading ? "Creating..." : "Create Post"}
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
}
