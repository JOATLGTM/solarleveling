"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";
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
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

interface BlogPost {
	id: string;
	title: string;
	content: string;
	imageUrl: string;
	createdAt: string;
}

export default function EditBlogPostPage() {
	const params = useParams();
	const router = useRouter();
	const postId = params.id as string;

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				// Get the Firebase Realtime Database URL from .env
				const dbUrl =
					process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
					"https://solarleveling-d3008-default-rtdb.firebaseio.com";

				// Fetch the specific blog post from the Realtime Database
				const response = await fetch(
					`${dbUrl}/blog-posts/${postId}.json`
				);

				if (!response.ok) {
					throw new Error("Failed to fetch blog post");
				}

				const postData = await response.json();

				if (postData) {
					setTitle(postData.title || "");
					setContent(postData.content || "");
					setImageUrl(postData.imageUrl || "");
				} else {
					setError("Blog post not found");
				}

				setLoading(false);
			} catch (err) {
				console.error("Error fetching blog post:", err);
				setError("Failed to load blog post. Please try again later.");
				setLoading(false);
			}
		};

		fetchPost();
	}, [postId]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setError(null);

		try {
			// Get the Firebase Realtime Database URL from .env
			const dbUrl =
				process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
				"https://solarleveling-d3008-default-rtdb.firebaseio.com";

			// Update the post in the Realtime Database
			const response = await fetch(`${dbUrl}/blog-posts/${postId}.json`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
					content,
					imageUrl,
					updatedAt: new Date().toISOString(),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to update blog post");
			}

			// Redirect to admin page
			router.push("/admin");
		} catch (err) {
			console.error("Error updating blog post:", err);
			setError("Failed to update blog post. Please try again.");
			setSubmitting(false);
		}
	};

	if (loading) {
		return (
			<div className="container py-12">
				<div className="max-w-2xl mx-auto">
					<Skeleton className="h-8 w-3/4 mb-4" />
					<Skeleton className="h-4 w-1/4 mb-8" />
					<Skeleton className="h-10 w-full mb-4" />
					<Skeleton className="h-10 w-full mb-4" />
					<Skeleton className="h-64 w-full mb-8" />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container py-12">
				<div className="max-w-2xl mx-auto text-center">
					<h1 className="text-2xl font-bold mb-4">Error</h1>
					<p className="text-red-500 mb-6">{error}</p>
					<Link href="/admin">
						<Button>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Admin
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="container py-12">
			<div className="max-w-2xl mx-auto">
				<Link
					href="/admin"
					className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Admin
				</Link>

				<Card>
					<CardHeader>
						<CardTitle>Edit Blog Post</CardTitle>
						<CardDescription>
							Update the details of your blog post
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="title">Title</Label>
								<Input
									id="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="imageUrl">Image URL</Label>
								<Input
									id="imageUrl"
									value={imageUrl}
									onChange={(e) =>
										setImageUrl(e.target.value)
									}
									placeholder="https://example.com/image.jpg"
								/>
								{imageUrl && (
									<div className="mt-2">
										<img
											src={imageUrl}
											alt="Preview"
											className="max-h-40 object-contain rounded-md border"
										/>
									</div>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="content">Content</Label>
								<Textarea
									id="content"
									value={content}
									onChange={(e) => setContent(e.target.value)}
									required
									rows={10}
								/>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Link href="/admin">
								<Button variant="outline" type="button">
									Cancel
								</Button>
							</Link>
							<Button type="submit" disabled={submitting}>
								{submitting ? "Updating..." : "Update Post"}
							</Button>
						</CardFooter>
					</form>
				</Card>

				{error && (
					<div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
						{error}
					</div>
				)}
			</div>
		</div>
	);
}
