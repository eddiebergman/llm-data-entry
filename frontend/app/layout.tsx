import './globals.css'

import { DEFAULT_THEME } from './constants';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
