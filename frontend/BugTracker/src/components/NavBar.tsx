import { Button } from '@chakra-ui/react'
import React from 'react'
import {BsFillMoonFill, BsFillSunFill} from 'react-icons/bs'
import logoW from '../assets/feromone_logo_white_new.png'
import logoB from '../assets/feromone_logo_black_new.png'

const NavBar = ({darkMode, mode}) => {
  return (
    <div className={mode === false ? "bg-gray-200 w-full h-[90px] flex items-center justify-between p-10 border-b-[3px] border-b-gray-800 text-black" : "bg-gray-700 text-white w-full h-[90px] flex items-center justify-between p-10 border-b-[3px] border-b-gray-300"}>
          <img src={mode === false ? logoB : logoW} alt="" width={490} height={450} className='relative right-[110px]' />
          <div className="flex items-center justify-evenly gap-5 text-3xl">
            <p>Bugs</p>
            <p>Kanban Board</p>
            <Button onClick={() => darkMode()} colorScheme='yellow'>{mode === false ? <BsFillMoonFill /> : <BsFillSunFill />}</Button>
          </div>
    </div>
  )
}

export default NavBar