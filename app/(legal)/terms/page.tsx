import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - HoodHub | Legal Terms & Conditions",
  description: "Read HoodHub's terms of service, including our policies for barbering, tattoo artistry, and lifestyle services.",
};

export default function TermsPage() {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-franklin mb-4">
          Terms of <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Service</span>
        </h1>
        <p className="text-gray-600 font-franklin">
          Last updated: June 2025
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 font-franklin text-gray-700 leading-relaxed">
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing and using HoodHub's services, you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services Provided</h2>
          <p>HoodHub provides premium personal grooming and lifestyle services including:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Professional barbering and hair styling services</li>
            <li>Custom tattoo artistry and body art</li>
            <li>Beauty treatments and spa services</li>
            <li>Lifestyle consultation and personal styling</li>
            <li>Related retail products and accessories</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Appointment Policies</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Booking and Confirmation</h3>
          <p>
            All appointments must be booked in advance through our official channels. We recommend booking at least 48 hours 
            in advance for optimal availability. Appointment confirmation will be sent via email or SMS.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Cancellation Policy</h3>
          <p>
            Cancellations must be made at least 24 hours before your scheduled appointment. Same-day cancellations or 
            no-shows may result in a cancellation fee equal to 50% of the service cost.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Late Arrivals</h3>
          <p>
            Please arrive on time for your appointment. Late arrivals may result in shortened service time or 
            rescheduling, depending on availability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Tattoo Services - Special Terms</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Age Requirements</h3>
          <p>
            Tattoo services are only provided to clients 18 years of age or older with valid government-issued identification. 
            No exceptions will be made to this policy.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Health and Safety</h3>
          <p>
            Clients must disclose any medical conditions, allergies, or medications that may affect the tattooing process. 
            We reserve the right to refuse service if we believe it may pose health risks.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Aftercare Responsibility</h3>
          <p>
            Proper aftercare is the client's responsibility. We provide detailed aftercare instructions and premium 
            aftercare products, but healing outcomes depend on client compliance.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Design Rights</h3>
          <p>
            Custom designs created by our artists remain the intellectual property of HoodHub. Clients receive 
            the right to use the design for their tattoo but not for commercial reproduction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment Terms</h2>
          <p>
            Payment is due at the time of service unless other arrangements have been made in advance. We accept 
            cash, credit cards, and digital payments. Deposits may be required for extended sessions or custom work.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Client Conduct</h2>
          <p>Clients are expected to:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Treat all staff and other clients with respect</li>
            <li>Follow all posted rules and safety guidelines</li>
            <li>Arrive clean and prepared for services</li>
            <li>Not be under the influence of drugs or alcohol</li>
            <li>Maintain appropriate behavior and language</li>
          </ul>
          <p className="mt-4">
            We reserve the right to refuse service or ask clients to leave if these standards are not met.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Liability and Disclaimers</h2>
          <p>
            While we maintain the highest standards of cleanliness and professionalism, clients acknowledge that 
            all services carry inherent risks. HoodHub is not liable for allergic reactions, infections, or 
            unsatisfactory results due to client non-compliance with aftercare instructions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Photography and Marketing</h2>
          <p>
            By receiving services at HoodHub, clients consent to photography of their completed work for portfolio 
            and marketing purposes, unless explicitly requested otherwise in writing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modifications to Terms</h2>
          <p>
            HoodHub reserves the right to modify these terms at any time. Updated terms will be posted on our 
            website and take effect immediately upon posting.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
          <p>
            For questions about these terms of service, please contact us:
          </p>
          <div className="mt-4 space-y-2">
            <p><strong>Email:</strong> legal@hoodhub.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Address:</strong> 123 Style Street, Downtown District, NY 10001</p>
          </div>
        </section>

        <div className="border-t border-gray-200 pt-8 mt-12">
          <p className="text-sm text-gray-500 text-center">
            These terms of service are effective as of June 2025 and govern all services provided by HoodHub.
          </p>
        </div>
      </div>
    </div>
  );
}