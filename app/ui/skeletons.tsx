import Image from 'next/image';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-cardColor/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`bg-cardColor text-white p-3 rounded-xl ${shimmer} relative overflow-hidden rounded-xl bg-cardColor p-2 shadow-sm min-h-[40rem]`}
    >
      <div className='w-full h-[32rem] md:h-[22rem] lg:h-[32rem] '>
        <Image
          src={'https://via.placeholder.com/150'}
          alt={''}
          width={0}
          height={0}
          sizes='100vw'
          className='w-full h-full object-cover rounded-xl'
        />
      </div>
      <div className='mt-5'>
        <div className='flex justify-between'>
          <h2 className='text-body-large font-montserrat'></h2>
        </div>
        <p className='text-body-small font-montserrat'></p>
      </div>
    </div>
  );
}

export const MoviesSkelton = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4 mt-4'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((key) => (
        <CardSkeleton key={key} />
      ))}
    </div>
  );
};
