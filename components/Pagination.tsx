import React from 'react'

const Pagination = () => {
  return (
    <div className='flex justify-center items-center space-x-4 mt-10 mb-15'>
    <button className='bg-cardColor text-white text-body-regular font-montserrat px-5 py-3 rounded-md'>
      Prev
    </button>
    <button className='bg-primary text-white text-body-regular font-montserrat px-5 py-3 rounded-md'>
      1
    </button>
    <button className='bg-cardColor text-white text-body-regular font-montserrat px-5 py-3 rounded-md'>
      2
    </button>
    <button className='bg-cardColor text-white text-body-regular font-montserrat px-5 py-3 rounded-md'>
      Next
    </button>
  </div>
  )
}

export default Pagination