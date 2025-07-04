import { FC } from "react";
import { useTranslation } from "react-i18next";

const Dashboard: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-semibold">{t("dashboard.title")}</h2>
      <p className="mt-4 text-gray-600">{t("dashboard.welcome")}</p>
    </div>
  );
};

export default Dashboard;

