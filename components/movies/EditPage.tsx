'use client'
import React, { useEffect, useRef, useState } from 'react'
import TextInput from '../TextInput'
import { useFormik } from 'formik'
import { createMovieSchema } from '../../schemas/createMovieSchema'
import ButtonGroup from '../ButtonGroup'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface Props {
  dict: any
}

const EditPage: React.FC<Props> = ({ dict }) => {
  const { cancel, dropImage, submit, title, year } = dict
  const { id } = useParams()

  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [poster, setPoster] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
    // @ts-ignore
    setSelectedImage(file)
    setIsUpdate(true)
  }

  const onSubmit = async (values: any) => {
    console.log('called')
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('publishingYear', values.publishingYear)
      if (poster !== null) {
        formData.append('poster', poster)
      }
      const res = await fetch(`/api/movies/${id}`, {
        method: 'PUT',
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
        toast.error(data.message)
        
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

  //fetch single data
  const getData = async () => {
    const res = await fetch(`/api/movies/${id}`)
    const data = await res.json()
    console.log('data', data)
    const { poster, title, publishingYear } = data.data.movie

    formik.setValues({ title, publishingYear })
    setSelectedImage(poster)
  }

  useEffect(() => {
    getData()
  }, [])

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
              {selectedImage ? (
                <Image
                  src={
                    isUpdate
                      ? URL.createObjectURL(new Blob([selectedImage]))
                      : `${process.env.NEXT_PUBLIC_BASE_URL}` +
                        '/' +
                        `${selectedImage} `
                  }
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
                value={formik.values.publishingYear}
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

export default EditPage
