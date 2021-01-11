import useSWR from 'swr'
import DataRow from '../components/data-row'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Home() {
  const {data, error} = useSWR('/api/customers', fetcher)

  if (error) return <div>failed to load</div>

  return (
    <div className='max-w-lg flex flex-col font-mono mx-auto'>
      <p className='font-mono text-4xl'>Next Fauna CRUD</p>
      <h2>Customer Data</h2>
      <table className='table-fixed border-4'>
        
        <thead>
          <tr>
            <th>name</th>
            <th>telephone</th>
            <th>credit card</th>
          </tr>
          
        </thead>
      
        <tbody>
          {data ? (
            data.map((d) => (
              <DataRow
                key={d.ref['@ref'].id}
                id={d.ref['@ref'].id}
                firstName={d.data.firstName}
                lastName={d.data.lastName}
                telephone={d.data.telephone}
                creditCard={d.data.creditCard.number}
              />
            ))
          ) : (
            <>
              <DataRow loading/>
              <DataRow loading/>
              <DataRow loading/>
            </>
          )}
        </tbody>
      </table>

    </div>
  )


}
