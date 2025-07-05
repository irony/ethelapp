import React, { ReactNode, useState, useEffect } from 'react';
import { Dialog, Menu } from '@headlessui/react';
import {
  Menu as IconMenu,
  User,
  Eye,
  MessageSquare,
  Home,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchFullname } from '@/services/api';

interface ShellLayoutProps {
  children: ReactNode;
}

export default function ShellLayout({ children }: ShellLayoutProps) {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fullname, setFullname] = useState<string | null>(null);

  useEffect(() => {
    fetchFullname()
      .then((data) => {
        if (data.available && data.fullname) setFullname(data.fullname);
      })
      .catch((err) => console.error('fullname fetch error', err));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white text-black w-full">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 h-12 border-b w-full">
        <button
          aria-label={t('layout.openDrawer')}
          onClick={() => setDrawerOpen(true)}
        >
          <IconMenu className="w-6 h-6" />
        </button>

        <div className="text-lg font-mono select-none">/ˈɛθəɫ/</div>

        <div className="flex items-center space-x-4">
          {/* show fullname if available */}
          {fullname && (
            <span className="text-sm font-medium truncate max-w-xs">
              {fullname}
            </span>
          )}
          <button aria-label={t('layout.viewAs')}>
            <Eye className="w-6 h-6" />
          </button>
          <Menu as="div" className="relative">
            <Menu.Button aria-label={t('layout.userMenu')}>
              <User className="w-6 h-6" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 bg-white shadow-lg rounded">
              <Menu.Item>
                {() => <button className="w-full text-left px-4 py-2">{t('layout.settings')}</button>}
              </Menu.Item>
              <Menu.Item>
                {() => <button className="w-full text-left px-4 py-2">{t('layout.logout')}</button>}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </header>

      {/* Context‐sensitive drawer */}
      <Dialog open={drawerOpen} onClose={() => setDrawerOpen(false)} className="fixed inset-0 z-40">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow p-4">
          <button className="mb-4" onClick={() => setDrawerOpen(false)}>
            {t('layout.close')}
          </button>
          {/* TODO: menu items */}
        </div>
      </Dialog>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4">{children}</main>

      {/* Bottom nav */}
      <nav className="flex items-center justify-between px-4 h-12 border-t w-full">
        <button aria-label={t('layout.home')}>
          <Home className="w-6 h-6" />
        </button>
        <div className="flex space-x-4">{/* quick‐access */}</div>
        <button aria-label={t('layout.chat')} className="p-2 bg-black text-white rounded-full">
          <MessageSquare className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}

