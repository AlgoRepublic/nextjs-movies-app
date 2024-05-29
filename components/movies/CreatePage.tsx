'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import TextInput from '../TextInput'
import ButtonGroup from '../ButtonGroup'
import { useFormik } from 'formik'
import { createMovieSchema } from '../../schemas/createMovieSchema'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Props {
  dict: any
}

const CreatePage: React.FC<Props> = ({ dict }) => {
  const { cancel, dropImage, submit, title, year } = dict
  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [poster, setPoster] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (event: { target: { files: File[] } }) => {
    const file = event.target.files[0]
    if (!file) {
      return false
    }
    if (!file.name.match(/\.(jpg|png)$/)) {
      toast.error('Photo should be png or jpg format.')
      return
    }
    if (file.size > 5120000) {
      toast.error('Photo size should be less than 5MB.')
      return
    }
    setPoster(file)
  }

  const onSubmit = async (values: any) => {
    try {
      setLoading(true)

      if (poster === null) {
        toast.error('Image is Required')
        setLoading(false)
        return
      }

      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('publishingYear', values.publishingYear)
      if (poster !== null) {
        formData.append('poster', poster)
      }
      const res = await fetch('/api/movies', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(data.message)
        setLoading(false)
        router.push('/movies')
      }
      if (!res.ok) {
        setLoading(false)
        toast.error('Unable to Create Movie')
      }
    } catch (error: any) {
      setLoading(false)
      toast.error('Unable to Create Movie')
    }
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      publishingYear: 0,
    },
    validationSchema: createMovieSchema,
    onSubmit,
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='lg:grid grid-cols-2 lg:pt-36 pt-15'>
          <div className='col-span-1 mb-19  '>
            <input
              type='file'
              accept='image/*'
              //@ts-ignore
              onChange={handleImageChange}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className='border-dashed text-body-small font-montserrat border-2 border-white flex justify-center items-center rounded-lg p-4 m-auto lg:m-0 w-full h-72  lg:h-[504px] lg:w-[473px] text-white cursor-pointer'
            >
              {poster ? (
                <Image
                  src={URL.createObjectURL(poster)}
                  alt='create'
                  width={0}
                  height={0}
                  className='h-full w-full object-cover'
                />
              ) : (
                <div className='m-auto'>
                  <ArrowDownTrayIcon className='w-9 h-9 ' />
                  <p className='text-white mt-2'>{dropImage}</p>
                </div>
              )}
            </div>
          </div>
          <div className='col-span-1 mb-10 lg:mt-0 mt-6 '>
            <div className='mb-5 items-center lg:w-3/4 w-full '>
              <TextInput
                id='title'
                name='title'
                type='text'
                placeholder={title}
                formik={formik}
              />
            </div>
            <div className='mb-10'>
              <input
                className={`lg:w-1/2 w-full text-body-small text-white items-center border ${
                  formik.touched.publishingYear && formik.errors.publishingYear
                    ? 'border-error'
                    : 'border-inputColor'
                } px-3 py-3 rounded-[10px] bg-inputColor focus:outline-none focus:ring-transparent focus:border-inputColor`}
                id='publishingYear'
                name='publishingYear'
                type='text'
                placeholder={year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.publishingYear &&
                formik.errors.publishingYear && (
                  <div className='mt-3 text-error'>
                    {formik.errors.publishingYear}
                  </div>
                )}
            </div>

            <ButtonGroup
              loading={loading}
              SubmitText={submit}
              Canceltext={cancel}
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default CreatePage
