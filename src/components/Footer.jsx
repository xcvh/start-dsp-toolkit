import { useTranslation } from "../i18n/I18nContext";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/assets/logos/eu-logo.png"
            alt={t("footer.euLogoAlt")}
            className="h-12 w-auto"
          />
          <p className="text-sm text-gray-600 text-center max-w-3xl">
            {t("footer.euDisclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
