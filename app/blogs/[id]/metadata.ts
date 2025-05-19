import { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	// Fetch the blog post data
	const dbUrl =
		process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
		"https://solarleveling-d3008-default-rtdb.firebaseio.com";
	const response = await fetch(`${dbUrl}/blog-posts/${params.id}.json`);
	const post = await response.json();

	if (!post) {
		return {
			title: "Blog Post Not Found | Solar Leveling",
			description: "The requested blog post could not be found.",
		};
	}

	// Create a description from the content (first 150 characters)
	const description = post.content
		? post.content.replace(/<[^>]*>/g, "").slice(0, 150) + "..."
		: "Read our latest insights about solar energy and sustainable living.";

	return {
		title: `${post.title} | Solar Leveling Blog`,
		description,
		openGraph: {
			title: post.title,
			description,
			type: "article",
			publishedTime: post.createdAt,
			images: post.imageUrl ? [post.imageUrl] : [],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description,
			images: post.imageUrl ? [post.imageUrl] : [],
		},
	};
}
