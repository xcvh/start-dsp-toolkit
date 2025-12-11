// Google Analytics 4 utility functions
// Handles GA4 initialization, page view tracking, and download event tracking

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
const CONSENT_KEY = 'analytics_consent';

/**
 * Check if analytics is enabled (user has consented)
 * @returns {boolean} True if user has given consent
 */
export const isAnalyticsEnabled = () => {
  if (typeof window === 'undefined') return false;
  const consent = localStorage.getItem(CONSENT_KEY);
  return consent === 'granted';
};

/**
 * Initialize Google Analytics 4
 * Dynamically loads the gtag.js script and configures GA4
 * Only call this AFTER user has consented
 */
export const initializeAnalytics = () => {
  // Don't initialize if no measurement ID is configured
  if (!MEASUREMENT_ID) {
    console.warn('GA4 Measurement ID not configured');
    return;
  }

  // Don't initialize if user hasn't consented
  if (!isAnalyticsEnabled()) {
    return;
  }

  // Check if already initialized
  if (window.gtag) {
    return;
  }

  // Create and load gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  // Configure GA4
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, {
    anonymize_ip: true, // GDPR compliance
    cookie_flags: 'SameSite=None;Secure',
  });

  console.log('GA4 initialized with ID:', MEASUREMENT_ID);
};

/**
 * Grant analytics consent and initialize GA4
 */
export const grantConsent = () => {
  localStorage.setItem(CONSENT_KEY, 'granted');
  initializeAnalytics();
};

/**
 * Deny analytics consent
 */
export const denyConsent = () => {
  localStorage.setItem(CONSENT_KEY, 'denied');
};

/**
 * Check if consent decision has been made
 * @returns {boolean} True if user has made a consent choice
 */
export const hasConsentDecision = () => {
  if (typeof window === 'undefined') return false;
  const consent = localStorage.getItem(CONSENT_KEY);
  return consent === 'granted' || consent === 'denied';
};

/**
 * Track a page view in GA4
 * Call this on route changes in the SPA
 * @param {string} path - The page path (e.g., '/tool/1')
 * @param {string} title - The page title
 */
export const trackPageView = (path, title) => {
  if (!isAnalyticsEnabled() || !window.gtag) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
};

/**
 * Track a file download event with custom parameters
 * @param {string} fileName - The name of the downloaded file
 * @param {number} toolNumber - The tool number (1-24)
 * @param {string} toolName - The name of the tool
 * @param {string} linkTitle - The title of the download link
 */
export const trackDownload = (fileName, toolNumber, toolName, linkTitle) => {
  if (!isAnalyticsEnabled() || !window.gtag) {
    return;
  }

  // Extract file extension
  const fileExtension = fileName.split('.').pop().toLowerCase();

  window.gtag('event', 'file_download', {
    file_name: fileName,
    file_extension: fileExtension,
    link_text: linkTitle,
    tool_number: toolNumber,
    tool_name: toolName,
    event_category: 'engagement',
    event_label: `Tool ${toolNumber}: ${fileName}`,
  });

  console.log('Download tracked:', {
    fileName,
    toolNumber,
    toolName,
    linkTitle,
  });
};
