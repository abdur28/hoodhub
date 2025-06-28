import type { Dictionary } from "../../dictionaries";

interface PrivacyPolicyPageProps {
  lang: string;
  dictionary: Dictionary;
}

export default function PrivacyPolicyPage({ lang, dictionary }: PrivacyPolicyPageProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-franklin mb-4">
          {dictionary.legal.privacy.title.main} <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">{dictionary.legal.privacy.title.highlight}</span>
        </h1>
        <p className="text-gray-600 font-franklin">
          {dictionary.legal.privacy.lastUpdated}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 font-franklin text-gray-700 leading-relaxed">
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.introduction.title}</h2>
          <p>
            {dictionary.legal.privacy.sections.introduction.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.information.title}</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{dictionary.legal.privacy.sections.information.personal.title}</h3>
          <p>{dictionary.legal.privacy.sections.information.personal.intro}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            {dictionary.legal.privacy.sections.information.personal.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{dictionary.legal.privacy.sections.information.automatic.title}</h3>
          <p>{dictionary.legal.privacy.sections.information.automatic.intro}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            {dictionary.legal.privacy.sections.information.automatic.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{dictionary.legal.privacy.sections.information.photos.title}</h3>
          <p>
            {dictionary.legal.privacy.sections.information.photos.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.usage.title}</h2>
          <p>{dictionary.legal.privacy.sections.usage.intro}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            {dictionary.legal.privacy.sections.usage.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.sharing.title}</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{dictionary.legal.privacy.sections.sharing.noSell.title}</h3>
          <p>
            {dictionary.legal.privacy.sections.sharing.noSell.content}
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{dictionary.legal.privacy.sections.sharing.limited.title}</h3>
          <p>{dictionary.legal.privacy.sections.sharing.limited.intro}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            {dictionary.legal.privacy.sections.sharing.limited.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.security.title}</h2>
          <p>
            {dictionary.legal.privacy.sections.security.intro}
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            {dictionary.legal.privacy.sections.security.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.retention.title}</h2>
          <p>
            {dictionary.legal.privacy.sections.retention.intro}
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            {dictionary.legal.privacy.sections.retention.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.rights.title}</h2>
          <p>{dictionary.legal.privacy.sections.rights.intro}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            {dictionary.legal.privacy.sections.rights.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="mt-4">
            {dictionary.legal.privacy.sections.rights.contact}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.cookies.title}</h2>
          <p>
            {dictionary.legal.privacy.sections.cookies.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.thirdParty.title}</h2>
          <p>
            {dictionary.legal.privacy.sections.thirdParty.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.children.title}</h2>
          <p>
            {dictionary.legal.privacy.sections.children.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.international.title}</h2>
          <p>
            {dictionary.legal.privacy.sections.international.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.updates.title}</h2>
          <p>
            {dictionary.legal.privacy.sections.updates.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dictionary.legal.privacy.sections.contact.title}</h2>
          <p>
            {dictionary.legal.privacy.sections.contact.intro}
          </p>
          <div className="mt-4 space-y-2">
            <p><strong>{dictionary.legal.privacy.sections.contact.privacy.label}</strong> {dictionary.legal.privacy.sections.contact.privacy.value}</p>
            <p><strong>{dictionary.legal.privacy.sections.contact.general.label}</strong> {dictionary.legal.privacy.sections.contact.general.value}</p>
            <p><strong>{dictionary.legal.privacy.sections.contact.phone.label}</strong> {dictionary.legal.privacy.sections.contact.phone.value}</p>
            <p><strong>{dictionary.legal.privacy.sections.contact.address.label}</strong> {dictionary.legal.privacy.sections.contact.address.value}</p>
          </div>
        </section>

        <div className="border-t border-gray-200 pt-8 mt-12">
          <p className="text-sm text-gray-500 text-center">
            {dictionary.legal.privacy.footer}
          </p>
        </div>
      </div>
    </div>
  );
}