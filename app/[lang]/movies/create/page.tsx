 
import React from 'react';
import { getDictionary } from '../../../../dictionaries';
import CreatePage from '@/components/movies/CreatePage';

type Props = {
  params: {
    [lang: string]: string
  }
}

const create = async ({ params: { lang } }: Props) => {
  const dict = await getDictionary(lang as 'en' | 'fr')

  const { heading } = dict.movies.create

  return (
    <>
      <div className='2xl:max-w-screen-2xl container mx-auto px-3 py-28 md:px-8  '>
        <h1 className='mb-9 text-heading-three md:text-heading-two font-montserrat text-white'>
          {heading}
        </h1>
        <CreatePage dict={dict.movies.create} />
      </div>
    </>
  )
}

export default create
