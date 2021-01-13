import {useState} from 'react'
import Router from 'next/router'
import {useForm} from 'react-hook-form'
import Layout from '../../components/layout'

const Create = () => {
    const [errorMessage, setErrorMessage] = useState('')

    const {handleSubmit, register, errors} = useForm()

    const onSubmit = handleSubmit(async (formData) => {
        if (errorMessage) setErrorMessage('')

        try {
            const res = await fetch('/api/customers/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (res.status === 200) {
                Router.push('/')
            } else {
                throw new Error(await res.text())
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    })

    return (
        <div className='flex flex-col mx-auto max-w-lg font-mono space-y-2'>
            <div className='text-2xl'>Create customer</div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>First Name</label>
                    <input
                        type='text'
                        name='firstName'
                        placeholder='e.g Bimo'
                        ref={register({required: 'First Name is required'})}
                    />
                    {errors.firstName && (
                        <span>
                            {errors.firstName.message}
                        </span>
                    )}
                </div>
                
                <div>
                    <label>Last Name</label>
                    <input
                        type='text'
                        name='lastName'
                        placeholder='e.g Satrio'
                        ref={register({required: 'Last Name is required'})}
                    />
                    {errors.lastName && (
                        <span>
                            {errors.lastName.message}
                        </span>
                    )}
                </div>

                <div>
                    <label>Telephone</label>
                    <input
                        type='text'
                        name='telephone'
                        placeholder='e.g 123-455-671'
                        ref={register}
                    />
                    {errors.telephone && (
                        <span>
                            {errors.telephone.message}
                        </span>
                    )}
                </div>

                <div>
                    <label>Credit Card Number</label>
                    <input
                        type='text'
                        name='creditCardNumber'
                        placeholder='e.g 1234567890'
                        ref={register}
                    />
                    {errors.creditCardNumber && (
                        <span>
                            {errors.creditCardNumber.message}
                        </span>
                    )}
                </div>

                <div>
                    <button className='bg-green-100' type='submit'>Create</button>
                </div>
            </form>
        </div>

    )
}


export default Create