// validationSchema.ts
import * as yup from 'yup'

export const createMovieSchema = yup.object({
  title: yup.string().required('Title is required'),
  publishingYear: yup.number().typeError('Publishing Year must be a number').required('Publishing Year is required'),
})
