import React from 'react'
import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    fullName: z.string().min(4, 'Full name must be 4 characters or more'),
    email: z.email('Invalid email address'),
})

type FormData = z.infer<typeof formSchema>

const SecondForm = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting }
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: 'onBlur'
    })

    const resolveSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data)

    }

    return (
        <div className='p-12'>

            <form onSubmit={handleSubmit(resolveSubmit)} className='flex flex-col gap-6'>
                <div className='w-full flex flex-col'>
                    <label htmlFor='fullName'>Full Name:</label>
                    <input {...register('fullName')} type='text' id='fullname' className='p-2 h-10 w-96 border outline-0 rounded-md focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50' />
                    <span className='text-red-600 text-sm'>{errors.fullName?.message}</span>
                </div>

                <div className='w-full flex flex-col'>
                    <label htmlFor='email'>Email:</label>
                    <input {...register('email')} type='email' id='email' className='p-2 h-10 w-96 border outline-0 rounded-md focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50' />
                    <span className='text-red-600 text-sm'>{errors.email?.message}</span>
                </div>

                <div>
                    Select Class Dropdown enum
                </div>
                <div>
                    Checkbox Select tutors enum
                </div>
                <div>
                    radio Do you like this class enum
                </div>
                <div>
                    <button disabled={isSubmitting} className='h-10 w-96 bg-black text-white rounded-md' type="submit">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                </div>
            </form >

        </div >
    )
}

export default SecondForm