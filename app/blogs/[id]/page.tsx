"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

interface BlogPost {
	id: string;
	title: string;
	content: string;
	imageUrl: string;
	createdAt: string;
}

export default function BlogPostPage() {
	const params = useParams();
	const postId = params.id as string;

	const [post, setPost] = useState<BlogPost | null>(null);
	const [loading, setLoading] = useState(true);
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
					setPost({
						id: postId,
						...postData,
					});
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

	// Format date from ISO string
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	if (loading) {
		return (
			<div className="container py-12">
				<div className="max-w-3xl mx-auto">
					<Skeleton className="h-8 w-3/4 mb-4" />
					<Skeleton className="h-4 w-1/4 mb-8" />
					<Skeleton className="h-64 w-full mb-8" />
					<Skeleton className="h-4 w-full mb-2" />
					<Skeleton className="h-4 w-full mb-2" />
					<Skeleton className="h-4 w-full mb-2" />
					<Skeleton className="h-4 w-3/4 mb-2" />
					<Skeleton className="h-4 w-full mb-2" />
					<Skeleton className="h-4 w-full mb-2" />
					<Skeleton className="h-4 w-2/3" />
				</div>
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className="container py-12">
				<div className="max-w-3xl mx-auto text-center">
					<h1 className="text-2xl font-bold mb-4">Error</h1>
					<p className="text-red-500 mb-6">
						{error || "Blog post not found"}
					</p>
					<Link href="/blogs">
						<Button>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Blog
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="container py-12">
			<div className="max-w-3xl mx-auto">
				<Link
					href="/blogs"
					className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Blog
				</Link>

				<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
					{post.title}
				</h1>

				<p className="text-muted-foreground mb-8">
					{formatDate(post.createdAt)}
				</p>

				{post.imageUrl && (
					<div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
						<img
							src={post.imageUrl}
							alt={post.title}
							className="object-cover w-full h-full"
						/>
					</div>
				)}

				<div
					className="prose prose-slate max-w-none dark:prose-invert"
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
			</div>
		</div>
	);
}
