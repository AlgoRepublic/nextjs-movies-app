import React from 'react'

interface TextInputProps {
  id: string
  type: string
  name: string
  placeholder: string
  formik: any
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  type,
  name,
  placeholder,
  formik,
}) => {
  return (
    <div>
      <input
        className={`w-full text-body-small text-white items-center border ${
          formik?.touched[name] && formik?.errors[name]
            ? 'border-error'
            : 'border-inputColor'
        } px-3 py-3 rounded-[10px] bg-inputColor focus:outline-none focus:ring-transparent focus:border-inputColor`}
        id={`${id}`}
        type={type}
        name={`${name}`}
        placeholder={`${placeholder}`}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        value={formik?.values[name]}
      />
      {formik?.touched[name] && formik?.errors[name] && (
        <div className='mt-3 text-error'>{formik?.errors[name]}</div>
      )}
    </div>
  )
}

export default TextInput
