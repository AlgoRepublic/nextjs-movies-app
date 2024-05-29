import Link from 'next/link'

const MovieFound: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-heading-three md:text-heading-two font-montserrat text-white mb-8'>
        Your movie list is empty
      </h1>

      <Link
        href='/movies/create'
        className='bg-primary hover:bg-primary mt-8 text-white text-body-regular py-3 px-6 rounded'
      >
        Add a new movie
      </Link>
    </div>
  )
}

export default MovieFound
