import "./globals.css";

const LIGHT_THEME = "mytheme";
const DEFAULT_THEME = LIGHT_THEME;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de" data-theme={DEFAULT_THEME}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
