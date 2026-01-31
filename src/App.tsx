import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(3, 'name is too short'),
  email: z.email(),
  password: z.string().min(3, 'Password is too short!')
})
type FormData2 = z.infer<typeof userSchema>



// interface FormData {
//   name: string,
//   email: string,
//   password: string
// }



const App = () => {
  const [formData, setFormData] = useState<FormData2>({
    name: '',
    email: '',
    password: ''
  })
  // const [errors, setErrors] = useState<FormData2>({
  //   name: '',
  //   email: '',
  //   password: ''
  // })
  // const handleChange = (e) => {
  //   const { name, value } = e.target

  //   setFormData(pre => ({
  //     ...pre,
  //     [name]: value
  //   }))

  //   setErrors(pre => ({
  //     ...pre,
  //     [name]: ''
  //   }))
  // }

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const payload = formData
  //   console.log(userSchema.parse(payload))
  // }



  const { register, handleSubmit, formState: { errors } } = useForm<FormData2>({
    resolver: zodResolver(userSchema)
  })

  const handleSubmitZod: SubmitHandler<FormFields> = data => {
    console.log(data)

  }

  return (
    <div className='w-full h-screen grid place-content-center'>
      <form onSubmit={handleSubmit(handleSubmitZod)} className='flex flex-col gap-3'>
        <div className='flex flex-col '>
          <label htmlFor='name' >Name:</label>
          <input {...register('name')} id='name' type='text' name='name' className='p-2 outline-0 border border-gray-700 h-8 w-72' />
          {errors.name && <span className='text-sm text-red-600 h-6'>{errors.name.message}</span>}
        </div>
        <div className='flex flex-col '>
          <label htmlFor='email' >Email:</label>
          <input {...register('email')} id='email' type='email' name='email' className='p-2 outline-0 border border-gray-700 h-8 w-72' />
          {errors.email && <span className='text-sm text-red-600 h-6'>{errors.email.message}</span>}
        </div>
        <div className='flex flex-col '>
          <label htmlFor='password' >Password:</label>
          <input {...register('password')} id='password' type='password' name='password' className='p-2 outline-0 border border-gray-700 h-8 w-72' />
          {errors.password && <span className='text-sm text-red-600 h-6'>{errors.password.message}</span>}
        </div>

        <button type='submit' className='h-8 w-72 bg-blue-900 text-white'>Submit</button>
      </form>
    </div>
  )
}

export default App