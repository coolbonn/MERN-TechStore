import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AuthModal from './AuthModal'
import UserDropdown from './UserDropdown'
// import logo from '../../public/tech-logo.png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div>
      <header className='header'>
        <NavLink to='/' className='logo' title='Tech Store | Home'>
          <img src={'/images/tech-store-logo.png'} alt='Logo' width={80} />
        </NavLink>
        <nav>
          <div className='page-links'>
            <NavLink
              style={{ textDecoration: 'none' }}
              activeClassName='active'
              to='/cellphones'
            >
              <span>Cell Phones</span>
            </NavLink>
            <NavLink
              style={{ textDecoration: 'none' }}
              activeClassName='active'
              to='/tvs'
            >
              <span>TVs</span>
            </NavLink>
            <NavLink
              style={{ textDecoration: 'none' }}
              activeClassName='active'
              to='/computers'
            >
              <span>Computers</span>
            </NavLink>
            <NavLink
              style={{ textDecoration: 'none' }}
              activeClassName='active'
              to='/accessories'
            >
              <span>Accessories</span>
            </NavLink>
          </div>

          <div className='auth-user_btn'>
            <NavLink
              style={{ textDecoration: 'none' }}
              activeClassName='active'
              to='/cart'
            >
              <div className='cart'>
                <span>Cart</span>
                <i className='fas fa-shopping-cart'></i>
              </div>
            </NavLink>
            {!userInfo ? (
              <div className='auth-btn' onClick={() => setIsOpen(true)}>
                <b className='signin'>Sign In</b>
                <strong className='divider'>|</strong>
                <b className='signup'>Sign Up</b>
              </div>
            ) : (
              <>
                <div className='user_dropdown_container'>
                  <div
                    className='user_dropdown_btn'
                    onClick={() => setOpenDropdown(!openDropdown)}
                  >
                    {userInfo.isAdmin ? (
                      <i className='fas fa-user-tie'></i>
                    ) : (
                      <i className='fas fa-user'></i>
                    )}
                    <h5>{userInfo.username}</h5>
                    <i className='fas fa-caret-down'></i>
                  </div>
                  <UserDropdown
                    openDropdown={openDropdown}
                    closeDropdown={() => setOpenDropdown(false)}
                  />
                </div>
              </>
            )}
          </div>
        </nav>
      </header>
      <AuthModal
        isOpen={isOpen}
        onShut={() => setIsOpen(false)}
        modalClose={(e) =>
          e.target.classList.contains('modal-wrapper') && setIsOpen(false)
        }
      />
    </div>
  )
}

export default Header
