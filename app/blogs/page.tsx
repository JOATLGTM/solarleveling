import { Metadata } from "next";
import BlogList from "@/components/blog-list";

export const metadata: Metadata = {
	title: "Blog | Solar Energy Solutions",
	description:
		"Read our latest articles about solar energy, renewable power, and sustainable living.",
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
