'use client'
import React from 'react'
import { Spinner } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'

interface ButtonGroupProps {
  SubmitText: string
  Canceltext: string
  loading: boolean
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  SubmitText,
  Canceltext,
  loading,
}) => {
  const router = useRouter()

  const handleCancel = () => {
    router.push('/movies')
  }

  return (
    <div className='flex space-x-8 lg:mt-20'>
      <button
        type='button'
        onClick={handleCancel}
        className='w-1/2 lg:w-1/4 p-3 font-montserrat text-body-regular bg-transparent border border-white rounded-md text-white hover:bg-blue-600'
      >
        {Canceltext}
      </button>
      <button
        type='submit'
        className='w-1/2 lg:w-1/4 p-3 font-montserrat text-body-regular bg-primary rounded-md text-white hover:bg-primary flex justify-center items-center'
      >
        {loading ? (
          <Spinner
            className='h-6 w-6'
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        ) : (
          <span>{SubmitText}</span>
        )}
      </button>
    </div>
  )
}

export default ButtonGroup
