import { FC } from 'react'
import TransactionForm from '../components/TransactionForm'
import TransactionTable from '../components/TransactionTable'
import { instance } from '../api/axios.api'
import { ICategory } from '../types/types'
import { toast } from 'react-toastify'

export const transactionLoader = async () => {
  
  const categories = await instance.get<ICategory[]>('/categories')
  const transactions = await instance.get('/transactions')

  const data = {
    categories: categories.data,
    transactions: transactions.data
  }
  return data
}

export const transactionAction = async ({ request }: any) => {
  
  switch(request.method) {
    case "POST": {
      const formData = await request.formData()
      const newTransaction ={
        title: formData.get('title'),
        amount: +formData.get('amount'),
        category: formData.get('category'),
        type: formData.get('type')
      }
      await instance.post('/transactions', newTransaction)
      toast.success('Transaction added.')
      return null
    }
    case "DELETE": {
      const formData = await request.formData()
      const transactionId = formData.get('id')  
      await instance.delete(`/transactions/transaction/${transactionId}`)
      toast.success('Transaction deleted.')
      return null
    }

  }
  
}

const Transactions: FC = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
        {/* Add Transaction Form */}
        <div className="grid col-span-2">
          <TransactionForm/>
        </div>
        
        {/* Statistics blocks */}
        <div className="rounded-md bg-slate-800 p-3 ">
          <div className="grid  grid-cols-2 gap-3">
             <div>
                <p className='uppercase text-md fond-bold text-center '>Total Income:</p>
                <p className="bg-green-600 p-1 rounded-sm text-center mt-2"> 1 000 грн.</p>
             </div>
             <div>
                <p className='uppercase text-md fond-bold text-center '>Total Expense:</p>
                <p className="bg-red-500 p-1 rounded-sm text-center mt-2"> 1 000 грн.</p>
             </div>
          </div>

          <>Chart</>
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionTable limit={5}/>
    </>
  )
}

export default Transactions