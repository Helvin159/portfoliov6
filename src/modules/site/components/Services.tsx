// Types
import type { SiteSettings } from '@/modules/site/types/content'

type ServicesProps = {
	services: SiteSettings['services']
}

export function Services({ services }: ServicesProps) {
	if (!services?.length) {
		return null
	}

	return (
		<section className="services">
			<p className="services__title">// My Services</p>
			<div className="services__blocks">
				{services.map((service) => (
					<div className="service" key={service.id ?? service.title}>
						<span aria-hidden="true">^</span>
						<p>{service.title}</p>
					</div>
				))}
			</div>
		</section>
	)
}
