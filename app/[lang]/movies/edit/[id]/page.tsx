
import EditPage from '@/components/movies/EditPage'
import React from 'react'
import { getDictionary } from '../../../../../dictionaries'

type Props = {
  params: {
    [lang: string]: string
  }
}
const Edit = async ({ params: { lang } }: Props) => {
  const dict = await getDictionary(lang as 'en' | 'fr')

  const { heading } = dict.movies.edit
  return (
    <>
      <div className='2xl:max-w-screen-2xl container mx-auto px-3 py-28 md:px-8 '>
        <h1 className='mb-9  text-heading-three md:text-heading-two font-montserrat text-white'>
          {heading}
        </h1>
        <EditPage dict={dict.movies.edit} />
      </div>
    </>
  )
}

export default Edit
