import React from 'react'

const Vulnerable = ({name}) => {
  return (
    <div className="p-2 bg-black min-w-[80px] items-center justify-center flex text-white rounded-md font-semibold">
        <p>{name}</p>
    </div>
  )
}

export default Vulnerable