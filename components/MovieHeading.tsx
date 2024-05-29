import React from 'react';
import {
  PlusCircleIcon,
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signOut } from '@/auth';
import { redirect } from 'next/navigation';

const MovieHeading = ({
  title,
  loginText,
  lang,
}: {
  title: string;
  loginText: string;
  lang: 'en' | 'fr';
}) => {
  return (
    <div className='flex justify-between items-center p-4  text-white mb-10'>
      <div className='flex items-center space-x-3'>
        <span className='text-heading-three lg:text-heading-two text-white font-montserrat'>
          {title}
        </span>
        <Link href={`/${lang}/movies/create`}>
          <PlusCircleIcon className='w-10 h-10' />
        </Link>
      </div>

      <form
        action={async () => {
          'use server';
          await signOut({
            redirect: false,
            // redirectTo: `/${lang}/login`,
          });

          redirect(`/${lang}/login`);
        }}
      >
        <button className='flex items-center space-x-2'>
          <span className='text-white text-body-regular font-montserrat '>
            {loginText}
          </span>
          <ArrowRightStartOnRectangleIcon className='w-9 h-9 text-white' />
        </button>
      </form>
    </div>
  );
};

export default MovieHeading;
