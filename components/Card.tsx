import { PencilIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CardProps {
  movie: any;
}

const Card: React.FC<CardProps> = ({ movie }) => {
  return (
    <>
      <div className='bg-cardColor text-white p-3 rounded-xl'>
        <div className='w-full h-[32rem] md:h-[22rem] lg:h-[32rem] '>
          <Image
            src={
              `${process.env.NEXT_PUBLIC_BASE_URL}` +
              '/' +
              `${movie.poster} `
            }
            alt={movie.title}
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-full object-cover rounded-xl'
          />
        </div>
        <div className='mt-5'>
          <div className='flex justify-between'>
            <h2 className='text-body-large font-montserrat'>{movie.title}</h2>
            <Link href={`/movies/edit/${movie._id}`}>
              <PencilIcon className='w-6 h-6' />
            </Link>
          </div>
          <p className='text-body-small font-montserrat'>
            {movie.publishingYear}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
