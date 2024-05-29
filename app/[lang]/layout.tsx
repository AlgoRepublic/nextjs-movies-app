import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie App',
  description: 'Movie App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} bg-backgroundColor`}>
      <div>{children}</div>
      <Toaster
        position='top-center'
        reverseOrder={false}
        containerClassName='overflow-auto'
      />
    </div>
  );
}
