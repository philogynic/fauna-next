// Detail Page
import {useRouter} from 'next/router'
import userSWR from 'swr'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then((r) => r.json())

const Customer = () => {
    const router = useRouter()
    const {id} = router.query

    const {data, error} = userSWR(`/api/customers/${id}`, fetcher)

    if (error) return <div>failed to load</div>

    const onClick = async () => {
        try {
            const res = await fetch(`/api/customers/${id}/delete`, {
                method: 'DELETE'
            })
            if (res.status === 200) {
                router.push('/')
            } else {
                throw new Error(await res.text())
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='flex flex-col max-w-lg mx-auto font-mono'>
            <div>
                {data ? (
                    <div>
                        <p className='text-4xl'>{data.firstName} {data.lastName}</p>
                        <p>{data.telephone}</p>
                        <p>{data.creditCard.number}</p>
                    </div>
                ) : (
                    <div>loading</div>
                )}
            </div>
            <div className='space-x-2'>
                <Link href='/customers/[id]/update' as={`/customers/${id}/update`}>
                    <a className='bg-blue-100'>edit</a>
                </Link>
                
                <button onClick={onClick} className='bg-red-100'>delete</button>
            </div>
            
        </div>
    )
}

export default Customer