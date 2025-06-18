import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - HoodHub | Data Protection & Privacy",
  description: "Learn about HoodHub's privacy policy, including how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-franklin mb-4">
          Privacy <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Policy</span>
        </h1>
        <p className="text-gray-600 font-franklin">
          Last updated: January 2025
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 font-franklin text-gray-700 leading-relaxed">
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
          <p>
            At HoodHub, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
            website, use our services, or interact with us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
          <p>We may collect the following personal information:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Name, email address, and phone number</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>IP address and device information</li>
            <li>Browser type and operating system</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website information</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Photos and Visual Content</h3>
          <p>
            With your consent, we may photograph completed work for portfolio and marketing purposes. 
            You have the right to opt out of photography at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Provide and improve our services</li>
            <li>Schedule and manage appointments</li>
            <li>Process payments and maintain billing records</li>
            <li>Communicate about services, appointments, and promotional offers</li>
            <li>Ensure health and safety compliance</li>
            <li>Maintain business records and legal compliance</li>
            <li>Improve our website and user experience</li>
            <li>Develop new services and marketing strategies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">We Do Not Sell Your Information</h3>
          <p>
            HoodHub does not sell, trade, or rent your personal information to third parties for marketing purposes.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Limited Sharing</h3>
          <p>We may share your information only in the following circumstances:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>With your explicit consent</li>
            <li>To comply with legal obligations or respond to legal requests</li>
            <li>With service providers who assist in business operations (payment processors, appointment systems)</li>
            <li>In case of business transfer or merger</li>
            <li>To protect the rights, property, or safety of HoodHub, our clients, or others</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, 
            alteration, disclosure, or destruction. These measures include:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Encryption of sensitive data during transmission</li>
            <li>Secure storage systems with access controls</li>
            <li>Regular security audits and updates</li>
            <li>Staff training on privacy and security practices</li>
            <li>Limited access to personal information on a need-to-know basis</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to fulfill the purposes outlined in this 
            privacy policy, comply with legal obligations, resolve disputes, and enforce our agreements. 
            Typical retention periods include:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Client records: 7 years from last service date</li>
            <li>Health information: As required by health regulations</li>
            <li>Payment records: 7 years for tax and accounting purposes</li>
            <li>Marketing communications: Until you unsubscribe</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Access and review your personal information</li>
            <li>Request corrections to inaccurate information</li>
            <li>Request deletion of your personal information (subject to legal requirements)</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent for photography and marketing use</li>
            <li>Request a copy of your personal information</li>
            <li>File a complaint with relevant privacy authorities</li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, please contact us using the information provided below.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
          <p>
            Our website uses cookies and similar technologies to enhance your browsing experience, analyze site traffic, 
            and personalize content. You can control cookie settings through your browser preferences, but disabling 
            cookies may affect website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices 
            or content of these external sites. We encourage you to review the privacy policies of any third-party 
            websites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal 
            information from children under 18. If we become aware that we have collected such information, we will 
            take steps to delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. International Data Transfers</h2>
          <p>
            Your personal information may be transferred to and processed in countries other than your own. We ensure 
            that such transfers comply with applicable data protection laws and implement appropriate safeguards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. 
            We will notify you of any material changes by posting the updated policy on our website and updating the 
            "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
            please contact us:
          </p>
          <div className="mt-4 space-y-2">
            <p><strong>Privacy Officer:</strong> privacy@hoodhub.com</p>
            <p><strong>General Contact:</strong> hello@hoodhub.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Address:</strong> 123 Style Street, Downtown District, NY 10001</p>
          </div>
        </section>

        <div className="border-t border-gray-200 pt-8 mt-12">
          <p className="text-sm text-gray-500 text-center">
            This Privacy Policy is effective as of January 2025 and applies to all personal information collected by HoodHub.
          </p>
        </div>
      </div>
    </div>
  );
}