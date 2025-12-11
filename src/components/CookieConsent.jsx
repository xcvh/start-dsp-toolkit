import { useState, useEffect } from 'react';
import { hasConsentDecision, grantConsent, denyConsent } from '../utils/analytics';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent decision
    const hasDecision = hasConsentDecision();
    setShowBanner(!hasDecision);
  }, []);

  const handleAccept = () => {
    grantConsent();
    setShowBanner(false);
  };

  const handleDecline = () => {
    denyConsent();
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-seafoam-300 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Cookie Consent
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              We use Google Analytics to understand how visitors use our site and to improve your experience.
              This helps us measure which educational tools are most useful. We anonymize IP addresses and
              do not collect personal information. By clicking "Accept", you consent to our use of cookies
              for analytics purposes.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 md:flex-initial px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              aria-label="Decline cookies"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-initial px-6 py-3 bg-seafoam-600 text-white font-medium rounded-lg hover:bg-seafoam-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:ring-offset-2"
              aria-label="Accept cookies"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
