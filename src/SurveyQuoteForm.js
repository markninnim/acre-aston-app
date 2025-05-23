import { useState, useEffect } from 'react';

export default function SurveyQuoteForm() {
  const [showIntro, setShowIntro] = useState(true);
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

  const logoUrl = "/logo512.png";
  const companyLogoUrl = "/acre_surveying.png";

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name.includes('name')
      ? value.replace(/\b\w/g, (l) => l.toUpperCase())
      : value;
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyValue = parseInt(formData.value.replace(/,/g, ''), 10) || 0;
      let estimatedQuote;
      if (propertyValue <= 100000) estimatedQuote = 499;
      else if (propertyValue <= 200000) estimatedQuote = 499;
      else if (propertyValue <= 300000) estimatedQuote = 549;
      else if (propertyValue <= 400000) estimatedQuote = 599;
      else if (propertyValue <= 500000) estimatedQuote = 649;
      else if (propertyValue <= 600000) estimatedQuote = 699;
      else if (propertyValue <= 700000) estimatedQuote = 749;
      else if (propertyValue <= 800000) estimatedQuote = 799;
      else if (propertyValue <= 900000) estimatedQuote = 849;
      else if (propertyValue <= 1000000) estimatedQuote = 899;
      else if (propertyValue <= 1250000) estimatedQuote = 949;
      else if (propertyValue <= 1500000) estimatedQuote = 999;
      else if (propertyValue <= 1750000) estimatedQuote = 1049;
      else if (propertyValue <= 2000000) estimatedQuote = 1099;
      else estimatedQuote = 'Price on application';

      setQuote(estimatedQuote);

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        const cleanValue = key === 'value' ? value.replace(/,/g, '') : value;
        data.append(key, cleanValue);
      });
      data.append('referred_by_firm', 'Aston Vaughan');

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

  if (showIntro) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#489d97] to-[#d9eeec] transition-opacity duration-1000 opacity-100 animate-fade-out">
        <div className="text-center animate-fade-in">
          <img src="/spinner.svg" alt="Loading Spinner" className="mx-auto mb-8 h-10 w-10 animate-spin" />
          <img src={logoUrl} alt="Acre Surveying Logo" className="mx-auto mb-4 h-16 w-auto max-w-[200px]" />
          <img src={companyLogoUrl} alt="Company Logo" className="mx-auto h-16 w-auto max-w-[200px]" />
        </div>
      </div>
    );
  }

  if (submitted) {
    const firstName = formData.referred_by_name?.split(' ')[0] || 'there';
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#489d97] to-[#d9eeec] overflow-hidden">
        <div className="font-sans w-full max-w-md mx-auto px-4 sm:px-6 text-center animate-fade-in">
          <img src={logoUrl} alt="Logo" className="mx-auto mb-6 h-16" />
          <h2 className="text-xl font-bold text-[#373f50] mb-4">Thank you, {firstName}!</h2>
          <p className="text-gray-700">
            Your referral has been received. Our team will handle the rest and ensure the customer gets the best possible experience.
          </p>
          <p className="text-gray-700 mt-2">
            Your client will now receive a full illustration with the opportunity to book and pay.
          </p>
          <p className="text-lg font-semibold text-[#373f50] mt-6">Estimated Survey Quote:</p>
          <div className="my-2 border-t border-gray-300 w-1/2 mx-auto"></div>
          <p className="text-[#373f50] border-[#6ecef5] text-xl font-bold mt-2">£{quote} (incl. VAT)</p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                first_name: '',
                last_name: '',
                postcode: '',
                value: '',
                email: '',
                phone: '',
                referred_by_name: '',
              });
            }}
            className="mt-6 bg-[#6ecef5] text-white px-4 py-2 rounded hover:bg-[#04a097]"
          >
            Submit Another Quote Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#489d97] to-[#d9eeec] overflow-hidden">
      <div className="font-sans w-full max-w-md mx-auto px-4 sm:px-6">
        <img src={logoUrl} alt="Logo" className="mx-auto mb-8 h-16" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
              aria-required="true"
              className="w-1/2 px-4 py-2 rounded"
            />
            <input
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-2 rounded"
            />
          </div>

          <input
            name="value"
            placeholder="Value"
            inputMode="numeric"
            pattern="[0-9]*"
            value={formData.value}
            onChange={handleChange}
            required
            aria-required="true"
            className="w-full px-4 py-2 rounded"
          />

          <input
            name="postcode"
            placeholder="Postcode"
            value={formData.postcode}
            onChange={(e) => handleChange({ target: { name: 'postcode', value: e.target.value.toUpperCase() } })}
            required
            className="w-full px-4 py-2 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange({ target: { name: 'email', value: e.target.value.toLowerCase() } })}
            required
            aria-required="true"
            className="w-full px-4 py-2 rounded"
          />

          <input
            name="phone"
            inputMode="numeric"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
              const formatted = digitsOnly.replace(/(\d{5})(\d{3})(\d{0,3})/, (match, p1, p2, p3) => {
                let result = p1;
                if (p2) result += ' ' + p2;
                if (p3) result += ' ' + p3;
                return result;
              });
              handleChange({ target: { name: 'phone', value: formatted } });
            }}
            required
            className="w-full px-4 py-2 rounded"
          />

          <input
            name="referred_by_name"
            placeholder="Your Name"
            value={formData.referred_by_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6ecef5] text-white px-5 py-3 rounded hover:bg-[#04a097]"
          >
            {loading ? 'Sending...' : 'Request A Quote'}
          </button>
        </form>

        <p className="mt-6 text-sm text-white text-center font-medium bg-[#373f50] p-3 rounded-lg">
          Upon submitting this information the homebuyer will receive a bespoke quotation based on their property value. If they are happy with the quote, they can follow the booking link and pay online.
        </p>
      </div>
    </div>
  );
}
