import React from 'react'

const NavBar = () => {
  return (
    <div className="bg-gray-200 w-full h-[90px] flex items-center justify-between p-10">
          <h1 className='text-3xl font-semibold'>🐝 Feromone</h1>
          <div className="flex items-center justify-evenly gap-5 text-3xl">
            <p>Bugs</p>
            <p>Kanban Board</p>
          </div>
    </div>
  )
}

export default NavBar