import {FC} from 'react'
import { FaTrash } from 'react-icons/fa'
import { useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import { formatDate } from '../helpers/date.helper'
import { formatToUSD,formatToUAH } from '../helpers/currency.helper'


const TransactionTable : FC  = () => {
    const { transactions }  = useLoaderData() as IResponseTransactionLoader
    
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
                                <button className='btn hover:btn-red ml-auto'>
                                    <FaTrash/>
                                </button>
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