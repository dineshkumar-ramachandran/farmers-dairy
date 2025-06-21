export default function ShippingAndDeliveryPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-slide-up">
          <h1 className="text-4xl font-bold text-earth-900 mb-8">Shipping and Delivery</h1>

          <div className="card space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Delivery Areas</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                We currently deliver fresh milk products to the following areas:
              </p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>Hosur and surrounding areas</li>
                <li>Selected areas in Bangalore</li>
                <li>Selected areas in Chennai</li>
              </ul>
              <p className="text-earth-600 leading-relaxed mt-4">
                Please contact us to confirm if we deliver to your specific location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Delivery Schedule</h2>
              <div className="bg-green-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-earth-900 mb-2">Standard Delivery Hours</h3>
                <p className="text-earth-700">
                  <strong>Daily:</strong> 6:00 AM - 7:00 AM
                  <br />
                  <strong>Days:</strong> Monday to Sunday
                </p>
              </div>
              <p className="text-earth-600 leading-relaxed">
                Our delivery team ensures that fresh milk reaches your doorstep every morning. We maintain consistent
                timing to fit into your daily routine.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Delivery Process</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">6:00 AM</div>
                  <h4 className="font-semibold text-earth-900 mb-2">Morning Milking</h4>
                  <p className="text-sm text-earth-600">Fresh milk collection from our farm</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">6:30 AM</div>
                  <h4 className="font-semibold text-earth-900 mb-2">Processing</h4>
                  <p className="text-sm text-earth-600">Quality testing and bottling in glass containers</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">7:00 AM</div>
                  <h4 className="font-semibold text-earth-900 mb-2">Delivery</h4>
                  <p className="text-sm text-earth-600">Fresh milk delivered to your doorstep</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Delivery Instructions</h2>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>Please provide clear and accurate delivery address</li>
                <li>Specify any special delivery instructions (gate code, apartment number, etc.)</li>
                <li>Ensure someone is available to receive the delivery or provide safe drop-off instructions</li>
                <li>Keep previous day's empty bottles ready for collection</li>
                <li>Notify us in advance if you need to skip a delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Subscription Delivery</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                For subscription customers, we offer flexible delivery options:
              </p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>
                  <strong>Daily Subscription:</strong> Milk delivered every day at the same time
                </li>
                <li>
                  <strong>Weekly Subscription:</strong> Choose specific days of the week for delivery
                </li>
                <li>
                  <strong>Monthly Subscription:</strong> Bulk delivery once a month with proper storage guidance
                </li>
                <li>
                  <strong>Custom Range:</strong> Select specific date ranges for delivery
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Missed Deliveries</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                If we are unable to deliver your order due to the following reasons:
              </p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>Incorrect or incomplete address</li>
                <li>No one available to receive the delivery</li>
                <li>Unsafe delivery location</li>
                <li>Customer unavailability</li>
              </ul>
              <p className="text-earth-600 leading-relaxed mt-4">
                We will attempt to contact you and reschedule the delivery. For subscription customers, missed
                deliveries will be adjusted to the next delivery cycle.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Weather and Emergency Delays</h2>
              <p className="text-earth-600 leading-relaxed">
                In case of severe weather conditions, natural disasters, or other emergencies, delivery may be delayed
                or temporarily suspended for safety reasons. We will notify customers as soon as possible about any
                delays and resume normal delivery once conditions improve.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Glass Bottle Return Policy</h2>
              <p className="text-earth-600 leading-relaxed mb-4">
                Our eco-friendly glass bottles are reusable and should be returned:
              </p>
              <ul className="list-disc list-inside text-earth-600 space-y-2">
                <li>Rinse bottles with clean water after use</li>
                <li>Keep bottles ready for collection during next delivery</li>
                <li>Damaged or lost bottles may incur replacement charges</li>
                <li>We sanitize and reuse all returned bottles</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-earth-900 mb-4">Contact for Delivery Issues</h2>
              <p className="text-earth-600 leading-relaxed">
                For any delivery-related queries or issues, please contact us:
              </p>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-earth-700">
                  <strong>Phone:</strong> 9363778989
                  <br />
                  <strong>Email:</strong> info@farmersdairy.com
                  <br />
                  <strong>Available:</strong> 7:00 AM - 8:00 PM
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
