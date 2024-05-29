import Pagination from '@/components/Pagination';
import Card from '@/components/Card';
import { Key } from 'react';

type Props = {
  dict: {
    title: string;
    logout: string;
    prev: string;
    next: string;
    search: string;
    loading: string;
    searchPlaceholder: string;
    noResults: string;
    error: string;
  };
  lang: 'en' | 'fr';
  query: string;
  currentPage: number;
};

const List = async ({ dict, lang, query, currentPage }: Props) => {
  const moviesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?page=${currentPage}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  );

  const res = await moviesRes.json();

  const movies: any = res?.data?.movies?.records || [];

  console.table(movies);

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4 mt-4'>
        {movies.map((movie: { title: Key | null | undefined }, index: any) => (
          <Card key={movie.title} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default List;
