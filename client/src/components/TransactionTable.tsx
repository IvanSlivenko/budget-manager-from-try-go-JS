import {FC, useState} from 'react'
import { FaTrash } from 'react-icons/fa'
import { useLoaderData, Form } from 'react-router-dom'
import { IResponseTransactionLoader, ITransaction } from '../types/types'
import { formatDate } from '../helpers/date.helper'
import { formatToUSD, formatToUAH } from '../helpers/currency.helper'
import { instance } from '../api/axios.api'

interface ITransactionTable {
    limit: number
}

const TransactionTable : FC  = ({ limit = 3 }) => {
    const { transactions }  = useLoaderData() as IResponseTransactionLoader

    const [data, setData] = useState<ITransaction[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)

    const fetchTransactions = async (page: number) =>{
        const response = await instance.get(`transactions/pagination?page=${page}&limit=${limit}`)
        setData(response.data)
        setTotalPages(limit ? Math.ceil(transactions.length/limit) : 1)
    }

  return (
    <>
        <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
             <table className='w-full'>
                <thead >
                        <tr className="border-b-2 border-gray-500 pb-10">
                            <td className='font-bold'>№</td>
                            <td className='font-bold'>Title</td>
                            <td className='font-bold text-center'>Amount ( грн. )</td>
                            <td className='font-bold'>Category</td>
                            <td className='font-bold'>Date</td>
                            <td className='text-right'>Action</td>
                        </tr>
                    </thead>   
                    <tbody>
                        {transactions.map((transaction, idx)=>(
                        <tr key={idx} className="border-b-2 border-x-white">
                            <td>{idx+1}</td>
                            <td>{transaction.title}</td>
                            <td 
                                className={transaction.type === 'income' ?  'text-green-500 text-left' : 'text-red-500 text-right pr-10'}
                            >
                                {/* {transaction.amount} */}
                                {transaction.type === 'income' 
                                    ? 
                                `+ ${formatToUAH(transaction.amount)}` 
                                    : 
                                `- ${formatToUAH(transaction.amount)}` }
                            </td>
                            <td className={!transaction.category ? 'text-yellow-500' : 'text-white' }>{transaction.category?.title || 'без категорії'}</td>
                            <td>{formatDate(transaction.createdAt)}</td>
                            <td>   
                                

                                <Form method='delete'  action='/transactions'>
                                    <input type="hidden" name='id' value={transaction.id} />
                                    <button className='btn hover:btn-red ml-auto'>
                                        <FaTrash/>
                                    </button>
                                </Form>
                            </td>
                        </tr> 
                        ))}
                    </tbody>
             </table>    
        </div>
    </>
  )
}

export default TransactionTable