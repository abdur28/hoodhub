import type { Dictionary } from "../../dictionaries";

interface TermsPageProps {
  lang: string;
  dictionary: Dictionary;
}

export default function TermsPage({ lang, dictionary }: TermsPageProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-franklin mb-4">
          {dictionary.legal.terms.title.main} <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">{dictionary.legal.terms.title.highlight}</span>
        </h1>
        <p className="text-gray-600 font-franklin">
          {dictionary.legal.terms.lastUpdated}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 font-franklin text-gray-700 leading-relaxed">
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.terms.sections.agreement.title}</h2>
          <p>
            {dictionary.legal.terms.sections.agreement.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.terms.sections.services.title}</h2>
          <p>{dictionary.legal.terms.sections.services.intro}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            {dictionary.legal.terms.sections.services.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.terms.sections.appointments.title}</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{dictionary.legal.terms.sections.appointments.booking.title}</h3>
          <p>
            {dictionary.legal.terms.sections.appointments.booking.content}
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{dictionary.legal.terms.sections.appointments.cancellation.title}</h3>
          <p>
            {dictionary.legal.terms.sections.appointments.cancellation.content}
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{dictionary.legal.terms.sections.appointments.late.title}</h3>
          <p>
            {dictionary.legal.terms.sections.appointments.late.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.terms.sections.tattoo.title}</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{dictionary.legal.terms.sections.tattoo.age.title}</h3>
          <p>
            {dictionary.legal.terms.sections.tattoo.age.content}
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{dictionary.legal.terms.sections.tattoo.health.title}</h3>
          <p>
            {dictionary.legal.terms.sections.tattoo.health.content}
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{dictionary.legal.terms.sections.tattoo.aftercare.title}</h3>
          <p>
            {dictionary.legal.terms.sections.tattoo.aftercare.content}
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{dictionary.legal.terms.sections.tattoo.design.title}</h3>
          <p>
            {dictionary.legal.terms.sections.tattoo.design.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.terms.sections.payment.title}</h2>
          <p>
            {dictionary.legal.terms.sections.payment.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.terms.sections.conduct.title}</h2>
          <p>{dictionary.legal.terms.sections.conduct.intro}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            {dictionary.legal.terms.sections.conduct.expectations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="mt-4">
            {dictionary.legal.terms.sections.conduct.disclaimer}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.terms.sections.liability.title}</h2>
          <p>
            {dictionary.legal.terms.sections.liability.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.terms.sections.photography.title}</h2>
          <p>
            {dictionary.legal.terms.sections.photography.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.terms.sections.modifications.title}</h2>
          <p>
            {dictionary.legal.terms.sections.modifications.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.terms.sections.contact.title}</h2>
          <p>
            {dictionary.legal.terms.sections.contact.intro}
          </p>
          <div className="mt-4 space-y-2">
            <p><strong>{dictionary.legal.terms.sections.contact.email.label}</strong> {dictionary.legal.terms.sections.contact.email.value}</p>
            <p><strong>{dictionary.legal.terms.sections.contact.phone.label}</strong> {dictionary.legal.terms.sections.contact.phone.value}</p>
            <p><strong>{dictionary.legal.terms.sections.contact.address.label}</strong> {dictionary.legal.terms.sections.contact.address.value}</p>
          </div>
        </section>

        <div className="border-t border-gray-200 pt-8 mt-12">
          <p className="text-sm text-gray-500 text-center">
            {dictionary.legal.terms.footer}
          </p>
        </div>
      </div>
    </div>
  );
}