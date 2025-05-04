import { useState } from 'react';

export default function SurveyQuoteForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    postcode: '',
    value: '',
    email: '',
    phone: '',
    referred_by_name: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyValue = parseInt(formData.value, 10);
      let estimatedQuote;
      if (propertyValue <= 100000) estimatedQuote = 299;
      else if (propertyValue <= 200000) estimatedQuote = 349;
      else if (propertyValue <= 300000) estimatedQuote = 399;
      else if (propertyValue <= 400000) estimatedQuote = 449;
      else if (propertyValue <= 500000) estimatedQuote = 499;
      else if (propertyValue <= 600000) estimatedQuote = 549;
      else if (propertyValue <= 700000) estimatedQuote = 599;
      else if (propertyValue <= 800000) estimatedQuote = 649;
      else if (propertyValue <= 900000) estimatedQuote = 699;
      else if (propertyValue <= 1000000) estimatedQuote = 749;
      else if (propertyValue <= 1250000) estimatedQuote = 799;
      else if (propertyValue <= 1500000) estimatedQuote = 899;
      else if (propertyValue <= 1750000) estimatedQuote = 949;
      else if (propertyValue <= 2000000) estimatedQuote = 999;
      else estimatedQuote = 'Price on application';

      setQuote(estimatedQuote);

      const data = new FormData();
      data.append('first_name', formData.first_name);
      data.append('last_name', formData.last_name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('postcode', formData.postcode);
      data.append('value', formData.value);
      data.append('referred_by_name', formData.referred_by_name);

      await fetch('https://acresurveying.co.uk/?fluentcrm=1&route=contact&hash=9d18b263-b9c2-44b5-8b0c-06b04b99e997', {
        method: 'POST',
        body: data,
        mode: 'no-cors'
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logoUrl = "https://acresurveying.co.uk/wp-content/uploads/2025/02/acre-surveying-logo.png";

  if (submitted) {
    const firstName = formData.first_name;
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#EAE4FB] to-white overflow-hidden">
        <div className="font-sans w-full max-w-md mx-auto px-4 sm:px-6 text-center">
          <img src={logoUrl} alt="Logo" className="mx-auto mb-6 h-12" />
          <h2 className="text-xl font-bold text-[#312e81] mb-4">Thank you {firstName}!</h2>
          <p className="text-gray-700">
            By referring customers like this, you are helping to support the business with good quality referral-based work — which is how you help us to drive fees up and also reward you.
          </p>
          <p className="text-gray-700 mt-2">
            Thank you for your support, {firstName}.<br />Keep up the great work.
          </p>
          <p className="text-lg font-semibold text-[#312e81] mt-6">Estimated Survey Quote:</p>
          <div className="my-2 border-t border-gray-300 w-1/2 mx-auto"></div>
          <p className="text-2xl font-bold text-[#312e81] mt-2">£{quote} (incl. VAT)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#EAE4FB] to-white overflow-hidden">
      <div className="font-sans w-full max-w-md mx-auto px-4 sm:px-6">
        <img src={logoUrl} alt="Logo" className="mx-auto mb-8 h-12" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-2 border border-[#312e81] rounded"
            />
            <input
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-2 border border-[#312e81] rounded"
            />
          </div>
          <input
            name="postcode"
            placeholder="Postcode"
            value={formData.postcode}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#312e81] rounded"
          />
          <input
            name="value"
            placeholder="Value"
            type="number"
            value={formData.value}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#312e81] rounded"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#312e81] rounded"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#312e81] rounded"
          />
          <input
            name="referred_by_name"
            placeholder="Your Name"
            value={formData.referred_by_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#312e81] rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#312e81] text-white px-5 py-3 rounded hover:bg-[#252162]"
          >
            {loading ? 'Sending...' : 'Request A Quote'}
          </button>
        </form>

        <p className="mt-6 text-sm text-[#312e81] text-center font-medium bg-indigo-50 border border-indigo-200 p-3 rounded-lg shadow-sm">
          Upon submitting this information the homeowner will receive a bespoke quotation based on their property value. If they are happy with the quote, they can follow the booking link and pay online.
        </p>
      </div>
    </div>
  );
}
