import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movies List',
  description: 'Movies List',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    return redirect('/');
  }
  return (
    <div className={`${inter.className} bg-backgroundColor`}>
      <div>{children}</div>
      <Footer />
    </div>
  );
}
