import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLists = [
    {name:'Acceuil', path:'/acceuil'},
    {name:'A propos', path:'/a-propos'},
    {name:'Contact', path:'/contact'}
]

const Navbar = () => {
    

  return (
    <header className='bg-amber-200 py-6 '>
        <nav className='container mx-auto flex justify-end items-center px-5'>
            <ul className='sm:flex hidden items-center gap-8'>
                {
                    // eslint-disable-next-line no-unused-vars
                    NavLists.map((list, index) => (
                        <li>
                            <NavLink to={`${list.path}`}
                            className={({isActive}) =>
                                isActive? "isActive": ""
                            }
                            >{list.name}</NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    </header>
  )
}

export default Navbar