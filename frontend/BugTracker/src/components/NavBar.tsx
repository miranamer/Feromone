import { Button } from '@chakra-ui/react'
import React from 'react'
import {BsFillMoonFill, BsFillSunFill} from 'react-icons/bs'

const NavBar = ({darkMode, mode}) => {
  return (
    <div className={mode === false ? "bg-gray-200 w-full h-[90px] flex items-center justify-between p-10 border-b-[3px] border-b-gray-800 text-black" : "bg-gray-700 text-white w-full h-[90px] flex items-center justify-between p-10 border-b-[3px] border-b-gray-300"}>
          <h1 className='text-3xl font-semibold'>🐝 Feromone</h1>
          <div className="flex items-center justify-evenly gap-5 text-3xl">
            <p>Bugs</p>
            <p>Kanban Board</p>
            <Button onClick={() => darkMode()} colorScheme='yellow'>{mode === false ? <BsFillMoonFill /> : <BsFillSunFill />}</Button>
          </div>
    </div>
  )
}

export default NavBar