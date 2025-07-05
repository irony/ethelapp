import React, { ReactNode, useState } from 'react';
import { Menu as IconMenu, User, Eye, MessageSquare, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ShellLayoutProps {
  children: ReactNode;
}

export default function ShellLayout({ children }: ShellLayoutProps) {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-white text-black">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 h-12 border-b">
        <button
          aria-label={t('layout.openDrawer')}
          onClick={() => setDrawerOpen((o) => !o)}
        >
          <IconMenu className="w-6 h-6" />
        </button>

        <div className="text-lg font-mono select-none">/ˈɛθəɫ/</div>

        <div className="flex items-center space-x-4">
          <button aria-label={t('layout.viewAs')}>
            <Eye className="w-6 h-6" />
          </button>
          <button aria-label={t('layout.userMenu')}>
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Simple collapsible drawer */}
      {drawerOpen && (
        <aside className="absolute top-12 left-0 w-64 h-[calc(100%-3rem)] bg-gray-100 border-r p-4">
          <button
            aria-label={t('layout.close')}
            className="mb-4 block"
            onClick={() => setDrawerOpen(false)}
          >
            {t('layout.close')}
          </button>
          <ul className="space-y-2">
            <li><a href="#" className="block px-2 py-1 hover:bg-gray-200">{t('layout.home')}</a></li>
            <li><a href="#" className="block px-2 py-1 hover:bg-gray-200">{t('layout.settings')}</a></li>
          </ul>
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4">{children}</main>

      {/* Bottom nav */}
      <nav className="flex items-center justify-between px-4 h-12 border-t">
        <button aria-label={t('layout.home')}>
          <Home className="w-6 h-6" />
        </button>
        <div className="flex space-x-4">
          {/* placeholder for quick-access */}
        </div>
        <button
          aria-label={t('layout.chat')}
          className="p-2 bg-black text-white rounded-full"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}

