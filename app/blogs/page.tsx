import { Metadata } from "next";
import BlogList from "@/components/blog-list";

export const metadata: Metadata = {
	title: "Solar Energy Blog | Latest News & Insights | Solar Leveling",
	description:
		"Discover expert insights on solar energy, renewable power trends, and sustainable living. Stay updated with the latest solar technology news and tips.",
	keywords:
		"solar energy blog, renewable energy news, solar technology, sustainable living, solar power insights",
	openGraph: {
		title: "Solar Energy Blog | Latest News & Insights | Solar Leveling",
		description:
			"Discover expert insights on solar energy, renewable power trends, and sustainable living. Stay updated with the latest solar technology news and tips.",
		type: "website",
	},
};

export default function BlogsPage() {
	return (
		<div className="container py-12">
			<div className="flex flex-col gap-8">
				<div className="text-center space-y-4">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Solar Energy Blog
					</h1>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
						Stay informed about the latest in solar energy,
						renewable power, and sustainable living.
					</p>
				</div>

				<BlogList />
			</div>
		</div>
	);
}
