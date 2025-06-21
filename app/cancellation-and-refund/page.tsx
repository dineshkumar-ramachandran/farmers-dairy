export default function CancellationAndRefundPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-slide-up">
          <h1 className="text-4xl font-bold text-earth-900 mb-8">Cancellation and Refund Policy</h1>

          <div className="card space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Order Cancellation</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                We understand that plans can change. Here's our cancellation policy:
              </p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>
                  <strong>Same Day Orders:</strong> Can be cancelled before 5:00 AM on the delivery day
                </li>
                <li>
                  <strong>Subscription Orders:</strong> Can be cancelled or paused at any time
                </li>
                <li>
                  <strong>Advance Orders:</strong> Can be cancelled up to 24 hours before scheduled delivery
                </li>
                <li>
                  <strong>Custom Range Orders:</strong> Can be modified or cancelled before the start date
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">How to Cancel</h2>
              <p className="text-earth-600 leading-relaxed mb-4">To cancel your order or subscription, you can:</p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>Call us at 9363778989</li>
                <li>Send an email to info@farmersdairy.com</li>
                <li>Contact us through our website contact form</li>
                <li>Inform our delivery person during regular delivery</li>
              </ul>
              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <p className="text-earth-700">
                  <strong>Note:</strong> Please provide your order number or registered phone number when requesting
                  cancellation.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Subscription Management</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                For subscription customers, we offer flexible management options:
              </p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>
                  <strong>Pause Subscription:</strong> Temporarily stop deliveries without cancelling
                </li>
                <li>
                  <strong>Modify Frequency:</strong> Change from daily to weekly or monthly
                </li>
                <li>
                  <strong>Skip Days:</strong> Skip specific delivery days
                </li>
                <li>
                  <strong>Complete Cancellation:</strong> End subscription permanently
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Refund Policy</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                We are committed to customer satisfaction and offer refunds in the following situations:
              </p>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-earth-900 mb-2">Full Refund Scenarios</h4>
                  <ul className="list-disc list-inside text-earth-600 space-y-1">
                    <li>Product quality issues (spoiled or contaminated milk)</li>
                    <li>Non-delivery due to our fault</li>
                    <li>Wrong product delivered</li>
                    <li>Damaged packaging affecting product quality</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-earth-900 mb-2">Partial Refund Scenarios</h4>
                  <ul className="list-disc list-inside text-earth-600 space-y-1">
                    <li>Late delivery (more than 2 hours from scheduled time)</li>
                    <li>Quantity discrepancies</li>
                    <li>Subscription adjustments for missed deliveries</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Refund Process</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                Our refund process is designed to be quick and hassle-free:
              </p>
              <ol className="list-decimal list-inside text-earth-600 space-y-2">
                <li>Contact us immediately with your complaint</li>
                <li>Provide order details and reason for refund request</li>
                <li>Our team will investigate the issue within 24 hours</li>
                <li>If approved, refund will be processed within 3-5 business days</li>
                <li>Refund will be credited to the original payment method</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Non-Refundable Situations</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                Please note that refunds may not be available in the following cases:
              </p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>Customer unavailability during scheduled delivery time</li>
                <li>Incorrect address provided by customer</li>
                <li>Refusal to accept delivery without valid reason</li>
                <li>Complaints raised more than 24 hours after delivery</li>
                <li>Normal taste variations due to seasonal changes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Quality Guarantee</h2>
              <p className="text-earth-600 leading-relaxed">
                We stand behind the quality of our products. If you're not completely satisfied with the freshness or
                quality of our milk, we will provide a full refund or replacement at no additional cost. Your
                satisfaction is our priority.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Subscription Refunds</h2>
              <p className="text-earth-600 leading-relaxed mb-4">For subscription customers:</p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>Unused subscription balance can be refunded upon cancellation</li>
                <li>Refunds are calculated on a pro-rata basis</li>
                <li>Processing fee may apply for early subscription cancellation</li>
                <li>Refunds for missed deliveries are automatically adjusted in next billing cycle</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Contact for Refunds</h2>
              <p className="text-earth-600 leading-relaxed">
                For any refund-related queries or to initiate a refund request:
              </p>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-earth-700">
                  <strong>Phone:</strong> 9363778989
                  <br />
                  <strong>Email:</strong> info@farmersdairy.com
                  <br />
                  <strong>Response Time:</strong> Within 24 hours
                  <br />
                  <strong>Refund Processing:</strong> 3-5 business days
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
