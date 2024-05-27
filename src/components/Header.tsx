import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/user/userSlice'
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper'
import { toast } from 'react-toastify'
import logo from '../assets/image/viti-2.png'
const Header: FC = () => {
	const isAuth = useAuth()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logoutHandler = () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		toast.success('You logged out.')
		navigate('/')
	}

	return (
		<header className="flex items-center  bg-slate-800 p-4 shadow-sm backdrop-blur-sm">
			<Link to="/">
				<img className='logo' src={logo} alt="" />
			</Link>

			{/* Menu */}
			{isAuth && (
				<nav className="ml-auto mr-10 headers">
					<ul className="flex items-center gap-5">
						<li>
							<NavLink
								to={'/'}
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Головна
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/transactions'}
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Дані  
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/categories'}
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Створення категорії
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/nauk'}
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Наукова діяльність
							</NavLink>
						</li>
					</ul>
				</nav>
			)}

			{/* Actions */}
			{isAuth ? (
				<button className="btn btn-red" onClick={logoutHandler}>
					<span>Вийти</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link
					className="ml-auto py-2 text-white/50 hover:text-white"
					to={'auth'}
				>
					Війти / Зареєстурватися
				</Link>
			)}
		</header>
	)
}

export default Header
