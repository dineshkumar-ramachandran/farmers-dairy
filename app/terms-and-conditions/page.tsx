export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-slide-up">
          <h1 className="text-4xl font-bold text-earth-900 mb-8">Terms and Conditions</h1>

          <div className="card space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">1. Introduction</h2>
              <p className="text-earth-600 leading-relaxed">
                Welcome to Farmer's Dairy. These terms and conditions outline the rules and regulations for the use of
                Farmer's Dairy's Website, located at farmersdairy.in.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">2. Acceptance of Terms</h2>
              <p className="text-earth-600 leading-relaxed">
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use
                Farmer's Dairy if you do not agree to take all of the terms and conditions stated on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">3. Product Information</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                All products sold by Farmer's Dairy are fresh dairy products. We strive to provide accurate product
                information, but we do not warrant that product descriptions or other content is accurate, complete,
                reliable, current, or error-free.
              </p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>All milk products are delivered fresh daily</li>
                <li>Products are sourced directly from our farm</li>
                <li>No preservatives or additives are used</li>
                <li>Glass bottles are eco-friendly and reusable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">4. Subscription Services</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                Our subscription services allow customers to receive regular deliveries of fresh milk products:
              </p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>Subscriptions can be daily, weekly, monthly, or custom range</li>
                <li>Customers can modify or pause subscriptions at any time</li>
                <li>Payment is processed according to the selected subscription frequency</li>
                <li>Delivery schedules may be adjusted due to unforeseen circumstances</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">5. Payment Terms</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                Payment for products and services must be made in advance:
              </p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>All prices are in Indian Rupees (INR)</li>
                <li>Payment is required before delivery</li>
                <li>We accept various payment methods including online payments</li>
                <li>Subscription payments are automatically processed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">6. Delivery Policy</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                We are committed to timely delivery of fresh products:
              </p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>Delivery is typically between 6:00 AM - 7:00 AM</li>
                <li>Customers must provide accurate delivery address</li>
                <li>We are not responsible for products left unattended as per customer instructions</li>
                <li>Delivery may be delayed due to weather or other unforeseen circumstances</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">7. Quality Guarantee</h2>
              <p className="text-earth-600 leading-relaxed">
                We guarantee the quality and freshness of our products. If you are not satisfied with the quality of any
                product, please contact us immediately for resolution.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-earth-600 leading-relaxed">
                Farmer's Dairy shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">9. Changes to Terms</h2>
              <p className="text-earth-600 leading-relaxed">
                We reserve the right to modify these terms and conditions at any time. Changes will be effective
                immediately upon posting on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">10. Contact Information</h2>
              <p className="text-earth-600 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-earth-700">
                  <strong>Phone:</strong> 9363778989
                  <br />
                  <strong>Email:</strong> info@farmersdairy.com
                  <br />
                  <strong>Address:</strong> Hosur, Tamil Nadu, India
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
