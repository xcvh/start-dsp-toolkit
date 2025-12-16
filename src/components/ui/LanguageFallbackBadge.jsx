import { useLanguage, useTranslation } from '../../i18n/I18nContext';

/**
 * LanguageFallbackBadge Component
 *
 * Displays a small "[EN]" badge to indicate that content is shown in English
 * as a fallback when the selected language version is not available.
 * Only shown when the current site language is not English.
 */
export default function LanguageFallbackBadge() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  // Only show when language is not English
  if (language === 'en') {
    return null;
  }

  return (
    <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded border border-gray-300">
      {t('badge.fallbackLanguage')}
    </span>
  );
}
