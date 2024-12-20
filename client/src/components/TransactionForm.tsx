import { FC } from 'react'
import { Form } from 'react-router-dom'
import { FaPlus }  from 'react-icons/fa'

const TransactionForm:FC = () => {
  return (
    <div className='rounded-md bg-slate-800 p-4'>
        <Form className='grid gap-2' method='post' action='/transactions'>
        <label className='grid' htmlFor="title">
            <span>Title</span>
            <input className='input  border-slate-900' type="text" placeholder='Title...' name='title' required />
        </label>

        <label className='grid' htmlFor="amount">
            <span>Amount</span>
            <input className='input border-slate-900' type="number" placeholder='Amount...' name='amount' required />
        </label>
        
        <h1>SELECT</h1>

        <button onClick={()=> {}} className='max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white' >
          <FaPlus/>
          <span>Manage Categories: </span>
        
        </button>
        </Form>
    </div>
  )
}

export default TransactionForm