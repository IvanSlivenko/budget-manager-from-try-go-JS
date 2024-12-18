import { FC, useState } from 'react'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'
import { FaPlus }  from 'react-icons/fa' 
import { Form, useLoaderData } from 'react-router-dom'
import CategoryModal from '../components/CategoryModal'
import { instance } from '../api/axios.api'
import { ICategory } from '../types/types'

export const categoriesAction = async ({ request }: any) => {
  switch(request.method){
    case "POST": {
      const formData = await request.formData()
      const title = {
        title: formData.get('title'),
      }
      await instance.post('/categories', title)
      return null
    }
    case "PATCH": {
      return null
    }
    case "DELETE": {
      return null
    }
  }
}

export const cayegoryLoader = async () => {
  const { data } = await instance.get<ICategory[]>('/categories')
  return data
}

const Categories: FC = () => {
  const categories = useLoaderData() as ICategory[]

  
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  return (
    <>
      <div className='mt-10 p-4 rounded-md bg-slate-800'>
        <h1>Your category list:</h1>
        
        {/* Category List */}
        <div className="flex mt-2 items-center gap-2 flex-wrap">
          {categories.map((category, idx)=>(
            <div key={idx} className='group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2'>
              {category.title}
            <div className="absolute hidden px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex">
              <button>
                <AiFillEdit/>
              </button>

              <Form 
                className='flex '
                method='delete'
                action='/categories'
                >
                  <input type="hidden" value={category.id} />
                  <button type='submit'> 
                    <AiFillCloseCircle/>
                  </button>
              </Form>

            </div>
          </div>
          ))}
        </div>

        {/* Add Category */}
        <button onClick={()=> setVisibleModal(true)} className='max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white' >
          <FaPlus/>
          <span>Create a new category</span>
        
        </button>
      </div>

      {/*Add Category Modal */}
      {visibleModal && <CategoryModal type='post'  setVisibleModal={setVisibleModal}/>}
      {/* Edit Category Modal */}
    </>
  )
}

export default Categories