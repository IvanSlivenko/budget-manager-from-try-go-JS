import { FC } from "react"

interface ICategoryModal {
    type: 'post' | 'patch',
    id: number
    setVisibleModal: (visible: boolean) => void
}

const CategoryModal: FC<ICategoryModal> = ({ type, id, setVisibleModal }) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex flex-col justify-center items-center">CategoryModal</div>
  )
}

export default CategoryModal