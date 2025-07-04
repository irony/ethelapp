// src/common/components/ShellLayout.tsx
import { ReactNode, useState } from "react";
import { Dialog, Menu as HeadlessMenu } from "@headlessui/react";
import { Menu, User, Eye, MessageSquare, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

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
          aria-label={t("layout.openDrawer")}
          onClick={() => setDrawerOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="text-lg font-mono select-none">/ˈɛθəɫ/</div>

        <div className="flex items-center space-x-4">
          <button aria-label={t("layout.viewAs")}>
            <Eye className="w-6 h-6" />
          </button>
          <HeadlessMenu as="div" className="relative">
            <HeadlessMenu.Button aria-label={t("layout.userMenu")}>
              <User className="w-6 h-6" />
            </HeadlessMenu.Button>
            <HeadlessMenu.Items className="absolute right-0 mt-2 bg-white shadow-lg rounded">
              <HeadlessMenu.Item>
                {() => <button className="px-4 py-2">{t("layout.settings")}</button>}
              </HeadlessMenu.Item>
              <HeadlessMenu.Item>
                {() => <button className="px-4 py-2">{t("layout.logout")}</button>}
              </HeadlessMenu.Item>
            </HeadlessMenu.Items>
          </HeadlessMenu>
        </div>
      </header>

      {/* Context Drawer */}
      <Dialog
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="fixed inset-0 z-40"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow p-4">
          <button onClick={() => setDrawerOpen(false)}>
            {t("layout.close")}
          </button>
        </div>
      </Dialog>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4">{children}</main>

      {/* Bottom nav */}
      <nav className="flex items-center justify-between px-4 h-12 border-t">
        <button aria-label={t("layout.home")}>
          <Home className="w-6 h-6" />
        </button>

        <div className="flex space-x-4">{/* Quick-access stubs */}</div>

        <button
          aria-label={t("layout.chat")}
          className="p-2 bg-black text-white rounded-full"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}

