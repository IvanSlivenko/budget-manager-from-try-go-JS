import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/user/userSlice'
import { removeTokenFromLocalStorage } from '../helpers/localstoradge.helper'
import { toast } from 'react-toastify'

const Header: FC = () => {
    const isAuth = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logOutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('You logged out.')
        navigate('/')

    }

    return (
    <header className='flex items-center  p-4  shadow-sm bg-slate-800 backdrop-blur-sm'>
        <Link to="/">
            <FaBtc size={20}/>
        </Link>

        {/* Menu */}
        {
            isAuth && (
                <nav className='ml-auto mr-10'>
                    <ul className="flex items-center gap-5 ">
                        <li>
                            <NavLink to={'/'} className={({ isActive })=> isActive ? 'text-white' : 'text-white/50'}
                        > 
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/transactions'} className={({ isActive })=> isActive ? 'text-white' : 'text-white/50'}>Transactions</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/categories'} className={({ isActive })=> isActive ? 'text-white' : 'text-white/50'}> Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/about'} className={({ isActive })=> isActive ? 'text-white' : 'text-white/50'}> About</NavLink>
                        </li>
                        
                    </ul>

                </nav>
            )}

        {/* Actions */}
        {
            isAuth ? (
                <button className='btn btn-red' onClick={logOutHandler}>
                    <span>Log Out</span>
                    <FaSignOutAlt />
                </button>
            ) : (
                <Link className='py-2 text-white/50 hover:text-white ml-auto' to={'auth'}>Log In / Sign In</Link>
            )
        }
    </header>
  )
}

export default Header