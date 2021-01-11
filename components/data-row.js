import Link from 'next/link'

const DataRow = ({
    id,
    firstName,
    lastName,
    telephone,
    creditCard,
    loading,
}) => (
    <tr className='dataRow'>
        <td className={loading ? 'loading' : ''}>
            <Link href='/customers/[id]' as={`/customers/${id}`}>
                <a>
                    {firstName} {lastName}    
                </a>            
            </Link>
        </td>
        <td className={`num ${loading ? 'loading' : ''}`}>{telephone}</td>
        <td className={`creditCard num ${loading ? 'loading': ''}`}>{creditCard}</td>
    </tr>
)

export default DataRow;