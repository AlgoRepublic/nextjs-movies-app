import { getDictionary } from '../../../dictionaries';
import Footer from '@/components/Footer';
import LoginComponent from '@/components/LoginComponent';

type Props = {
  params: { [lang: string]: string };
};

export default async function login({ params: { lang } }: Props) {
  const dict = await getDictionary(lang as 'en' | 'fr');

  const { title } = dict.login;

  return (
    <div className='grid grid-rows-[1fr_auto] min-h-screen'>
      <main className='flex items-center justify-center'>
        <div className='w-full max-w-md p-8'>
          <h1 className='mb-6 text-heading-one font-montserrat text-center text-white'>
            {title}
          </h1>
          <LoginComponent dict={dict.login} lang={lang as 'en' | 'fr'} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
