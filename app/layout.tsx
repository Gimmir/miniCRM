import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
    title: 'Mini CRM',
    description: 'Telegram-friendly CRM dashboard',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uk">
            <body>{children}</body>
        </html>
    );
}
