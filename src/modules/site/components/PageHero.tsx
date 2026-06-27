type PageHeroProps = {
	text: string
}

export function PageHero({ text }: PageHeroProps) {
	return (
		<section className="hero">
			<h1>{text}</h1>
		</section>
	)
}
