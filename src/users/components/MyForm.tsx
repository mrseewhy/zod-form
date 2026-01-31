import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const FormSchema = z.object({
    name: z.string('input your name').min(3, 'Name is too short'),
    age: z.number('Input your age').gte(18, 'You must be an adult'),
    gender: z.string('Select an option'),
    email: z.string().email(),
    password: z.string().min(8, 'Password too short'),
    continent: z.string().min(1, 'Please select a continent'),
    transport: z.array(z.string(), 'Select at least one transport option').min(1, 'Select at least one transport option')
})

type FormSchema = z.infer<typeof FormSchema>

const MyForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormSchema>({
        resolver: zodResolver(FormSchema)
    })



    const handleSubmitZod: SubmitHandler<FormSchema> = (data: FormSchema) => {
        console.log('data=>', data)

    }
    return (
        <div className='w-full h-screen grid place-items-center'>
            <div className='w-[50vw] h-full bg-gray-100 rounded-lg shadow-md shadow-gray-300 hover:-translate-y-2 transition-all duration-300 p-10 grid place-items-center'>

                <form onSubmit={handleSubmit(handleSubmitZod)} className='flex flex-col gap-6 w-full h-full mt-10'>
                    <div className='flex flex-col'>
                        <label htmlFor='name' className='font-bold'>Name:</label>
                        <input {...register('name')} id='name' type='text' className='outline-0 border border-gray-600 h-10 w-full rounded-md p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50
      transition-colors duration-150
      invalid:border-red-500 invalid:focus:ring-red-200' />
                        {errors.name && <span className='text-xs mt-1 text-red-700'> {errors.name.message}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='age' className='font-bold'>Age:</label>
                        <input {...register('age', { valueAsNumber: true })} id='age' type='number' className='outline-0 border border-gray-600 h-10 w-full rounded-md p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50
      transition-colors duration-150
      invalid:border-red-500 invalid:focus:ring-red-200' />
                        {errors.age && <span className='text-xs mt-1 text-red-700'> {errors.age.message}</span>}
                    </div>

                    <div className='flex flex-col'>
                        <fieldset>
                            <legend className='font-bold mb-1'>Gender: </legend>
                            <div className=' flex gap-3 '>
                                <label className="cursor-pointer">
                                    <input {...register('gender')} name="gender" type='radio' className='focus-visible:ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100 h-3 w-3' value='male' />
                                    <span className='ml-1'>Male</span>
                                </label>
                                <label className="cursor-pointer">
                                    <input {...register('gender')} name="gender" type='radio' className='focus-visible:ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100 h-3 w-3' value='female' />
                                    <span className='ml-1'>Female</span>
                                </label>
                                <label className="cursor-pointer">
                                    <input {...register('gender')} name="gender" type='radio' className='focus-visible:ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100 h-3 w-3' value='non-binary' />
                                    <span className='ml-1'>Non-binary</span>
                                </label>
                                <label className="cursor-pointer">
                                    <input {...register('gender')} name="gender" type='radio' className='focus-visible:ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100 h-3 w-3' value='prefer not to say' />
                                    <span className='ml-1'>Prefer not to say</span>
                                </label>
                            </div>
                        </fieldset>
                        {errors.gender && <span className='text-xs mt-1 text-red-700'> {errors.gender.message}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='email' className='font-bold'>Email:</label>
                        <input {...register('email')} id='email' type='email' className='outline-0 border border-gray-600 h-10 w-full rounded-md p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50
      transition-colors duration-150
      invalid:border-red-500 invalid:focus:ring-red-200' />
                        {errors.email && <span className='text-xs mt-1 text-red-700'> {errors.email.message}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='password' className='font-bold'>Password:</label>
                        <input {...register('password')} id='password' type='password' className='outline-0 border border-gray-600 h-10 w-full rounded-md p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50
      transition-colors duration-150
      invalid:border-red-500 invalid:focus:ring-red-200' />
                        {errors.password && <span className='text-xs mt-1 text-red-700'> {errors.password.message}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='continent' className='font-bold'>Continent</label>
                        <select defaultValue="" {...register('continent')} id='continent' name='continent' className='outline-0 border border-gray-600 h-10 w-full rounded-md p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-150 '>
                            <option value="" disabled >--Select your continent --</option>
                            <option value="africa">Africa</option>
                            <option value="asia">Asia</option>
                            <option value="europe">Europe</option>
                            <option value="south america">South America</option>
                            <option value="north america">North America</option>
                            <option value="antarctica">Antarctica</option>
                            <option value="australia">Australia</option>
                        </select>

                        {errors.continent && <span className='text-xs mt-1 text-red-700'> {errors.continent.message}</span>}
                    </div>


                    <div className='flex flex-col'>
                        <fieldset>
                            <legend className='font-bold mb-1'>Mode Of Transportation </legend>
                            <div className=' flex gap-3 '>
                                <label className="cursor-pointer">
                                    <input {...register('transport')} name="transport[]" type='checkbox' className='focus-visible:ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100 h-3 w-3' value='bicycle' />
                                    <span className='ml-1'>Bicycle</span>
                                </label>
                                <label className="cursor-pointer">
                                    <input {...register('transport')} name="transport[]" type='checkbox' className='focus-visible:ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100 h-3 w-3' value='motorbike' />
                                    <span className='ml-1'>Motorbike</span>
                                </label>
                                <label className="cursor-pointer">
                                    <input {...register('transport')} name="transport[]" type='checkbox' className='focus-visible:ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100 h-3 w-3' value='car' />
                                    <span className='ml-1'>Car</span>
                                </label>
                                <label className="cursor-pointer">
                                    <input {...register('transport')} name="transport[]" type='checkbox' className='focus-visible:ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100 h-3 w-3' value='plane' />
                                    <span className='ml-1'>Plane</span>
                                </label>
                                <label className="cursor-pointer">
                                    <input {...register('transport')} name="transport[]" type='checkbox' className='focus-visible:ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100 h-3 w-3' value=' helicopter' />
                                    <span className='ml-1'>Helicopter</span>
                                </label>
                            </div>
                        </fieldset>
                        {errors.transport && <span className='text-xs mt-1 text-red-700'> {errors.transport.message}</span>}
                    </div>
                    <div className='mt-4'>
                        <button className='h-10 w-full bg-gray-950 text-white rounded-md font-bold'> Submit</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default MyForm