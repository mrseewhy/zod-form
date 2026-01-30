import React, { useState } from 'react'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(3, 'name is too short')
})

interface FormData {
  name: string
}

const App = () => {
  const [formData, setFormData] = useState<FormData>({
    name: ''
  })
  const [errors, setErrors] = useState<FormData>({
    name: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(pre => ({
      ...pre,
      [name]: value
    }))

    setErrors(pre => ({
      ...pre,
      [name]: ''
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = formData
    console.log(userSchema.parse(payload))
  }

  return (
    <div className='w-full h-screen grid place-content-center'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <div className='flex flex-col items-center'>
          <input type='text' name='name' value={formData.name} onChange={handleChange} className='p-2 outline-0 border border-gray-700 h-8 w-72' />
          {errors.name && <span className='text-sm text-red-600 h-6'>Error!</span>}
        </div>

        <button type='submit' className='h-8 w-72 bg-blue-900 text-white'>Submit</button>
      </form>
    </div>
  )
}

export default App