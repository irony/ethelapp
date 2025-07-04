import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const LoginPage: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-xl font-semibold">{t('login.title')}</h1>
    </div>
  );
};

export default LoginPage;

