"use client";

import { useState, useEffect } from "react";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface BlogPost {
	id: string;
	title: string;
	content: string;
	imageUrl: string;
	createdAt: string;
}

export default function AdminPage() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			const dbUrl =
				process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
				"https://solarleveling-d3008-default-rtdb.firebaseio.com";

			const response = await fetch(`${dbUrl}/blog-posts.json`);

			if (!response.ok) {
				throw new Error("Failed to fetch blog posts");
			}

			const data = await response.json();

			if (data) {
				const postsArray = Object.entries(data).map(
					([id, postData]: [string, any]) => ({
						id,
						...postData,
					})
				);

				postsArray.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime()
				);

				setPosts(postsArray);
			} else {
				setPosts([]);
			}

			setLoading(false);
		} catch (err) {
			console.error("Error fetching posts:", err);
			setError("Failed to load blog posts");
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!window.confirm("Are you sure you want to delete this post?")) {
			return;
		}

		try {
			const dbUrl =
				process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
				"https://solarleveling-d3008-default-rtdb.firebaseio.com";

			const response = await fetch(`${dbUrl}/blog-posts/${id}.json`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete post");
			}

			setPosts(posts.filter((post) => post.id !== id));
		} catch (err) {
			console.error("Error deleting post:", err);
			setError("Failed to delete post");
		}
	};

	if (loading) {
		return (
			<div className="container py-12">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold">Blog Admin</h1>
					<Link href="/admin/new">
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							New Post
						</Button>
					</Link>
				</div>
				<div className="grid gap-4">
					{[1, 2, 3].map((i) => (
						<Card key={i}>
							<CardHeader>
								<div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
								<div className="h-4 w-1/4 bg-muted rounded animate-pulse mt-2" />
							</CardHeader>
							<CardContent>
								<div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
								<div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="container py-12">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Blog Admin</h1>
				<Link href="/admin/new">
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						New Post
					</Button>
				</Link>
			</div>

			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			<div className="grid gap-4">
				{posts.map((post) => (
					<Card key={post.id}>
						<CardHeader>
							<CardTitle>{post.title}</CardTitle>
							<CardDescription>
								Created{" "}
								{formatDistanceToNow(new Date(post.createdAt), {
									addSuffix: true,
								})}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								{post.content.substring(0, 150)}...
							</p>
						</CardContent>
						<CardFooter className="flex justify-end gap-2">
							<Link href={`/admin/edit/${post.id}`}>
								<Button variant="outline" size="sm">
									<Pencil className="mr-2 h-4 w-4" />
									Edit
								</Button>
							</Link>
							<Button
								variant="destructive"
								size="sm"
								onClick={() => handleDelete(post.id)}
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Delete
							</Button>
						</CardFooter>
					</Card>
				))}

				{posts.length === 0 && (
					<Card>
						<CardContent className="py-8 text-center text-muted-foreground">
							No blog posts yet. Create your first post!
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
