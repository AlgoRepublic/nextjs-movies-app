import { Spinner } from '@material-tailwind/react'
import React from 'react'

interface ButtonProps {
  text: string
  loading: boolean
}

const TextButton: React.FC<ButtonProps> = ({ text, loading }) => {
  return (
    <button
      className='w-full text-body-regular text-white px-4 py-3 font-montserrat bg-primary rounded-[10px] hover:bg-primary focus:outline-none focus:shadow-outline flex justify-center items-center'
      type='submit'
    >
      {loading ? (
        <Spinner
          className='h-6 w-6'
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      ) : (
        <span>{text}</span>
      )}
    </button>
  )
}

export default TextButton
