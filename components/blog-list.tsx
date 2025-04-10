"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
	id: string;
	title: string;
	content: string;
	imageUrl: string;
	createdAt: string;
}

export default function BlogList() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				// Get the Firebase Realtime Database URL from .env
				const dbUrl =
					process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
					"https://solarleveling-d3008-default-rtdb.firebaseio.com";

				// Fetch blog posts from the Realtime Database
				const response = await fetch(`${dbUrl}/blog-posts.json`);

				if (!response.ok) {
					throw new Error("Failed to fetch blog posts");
				}

				const data = await response.json();

				// Convert the data object to an array of posts with IDs
				const fetchedPosts = Object.entries(data).map(
					([id, postData]: [string, any]) => ({
						id,
						...postData,
					})
				);

				// Sort posts by creation date (newest first)
				fetchedPosts.sort((a, b) => {
					return (
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime()
					);
				});

				setPosts(fetchedPosts);
				setLoading(false);
			} catch (err) {
				console.error("Error fetching blog posts:", err);
				setError("Failed to load blog posts. Please try again later.");
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	// Function to truncate content for preview
	const truncateContent = (content: string, maxLength: number = 150) => {
		// Remove HTML tags for preview
		const plainText = content.replace(/<[^>]*>/g, "");
		if (plainText.length <= maxLength) return plainText;
		return plainText.substring(0, maxLength) + "...";
	};

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
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<Card key={i} className="overflow-hidden">
						<Skeleton className="h-48 w-full" />
						<CardHeader>
							<Skeleton className="h-6 w-3/4" />
							<Skeleton className="h-4 w-1/2" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-2/3" />
						</CardContent>
						<CardFooter>
							<Skeleton className="h-10 w-24" />
						</CardFooter>
					</Card>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-8">
				<p className="text-red-500">{error}</p>
				<Button
					variant="outline"
					className="mt-4"
					onClick={() => window.location.reload()}
				>
					Try Again
				</Button>
			</div>
		);
	}

	if (posts.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-muted-foreground">No blog posts found.</p>
			</div>
		);
	}

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<Card key={post.id} className="overflow-hidden flex flex-col">
					{post.imageUrl && (
						<div className="relative h-48 w-full">
							<img
								src={post.imageUrl}
								alt={post.title}
								className="object-cover w-full h-full"
							/>
						</div>
					)}
					<CardHeader>
						<CardTitle>{post.title}</CardTitle>
						<CardDescription>
							{formatDate(post.createdAt)}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex-grow">
						<p className="text-muted-foreground">
							{truncateContent(post.content)}
						</p>
					</CardContent>
					<CardFooter>
						<Link href={`/blogs/${post.id}`} className="w-full">
							<Button className="w-full">Read More</Button>
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
