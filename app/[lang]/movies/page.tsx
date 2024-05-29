import Pagination from '@/app/ui/common/pagination';
import { MoviesSkelton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { getDictionary } from '../../../dictionaries';
import Movies from '../../../components/movies';
import MovieHeading from '@/components/MovieHeading';

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
  params: {
    [lang: string]: string;
  };
};

export const metadata: Metadata = {
  title: 'Movies',
};

export default async function Page({ searchParams, params: { lang } }: Props) {
  const dict = await getDictionary(lang as 'en' | 'fr');
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const movies = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`, {
    method: 'GET',
  });
  const res = await movies.json();
  const totalPages = res?.data?.totalPages || 0;
  const { title, logout } = dict.movies;

  return (
    <div className='2xl:max-w-screen-2xl container mx-auto px-3 py-28 md:px-8 '>
      <MovieHeading
        title={title}
        loginText={logout}
        lang={lang as 'en' | 'fr'}
      />
      <Suspense key={query + currentPage} fallback={<MoviesSkelton />}>
        <Movies
          dict={dict.movies}
          lang={lang as 'en' | 'fr'}
          query={query}
          currentPage={currentPage}
        />
      </Suspense>
      <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div>
      ;
    </div>
  );
}
