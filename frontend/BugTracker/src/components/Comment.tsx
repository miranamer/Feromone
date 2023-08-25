import React from 'react'

const Comment = ({comment}) => {
  return (
    <div className="max-w-[400px] rounded-md p-2 justify-center border-gray-500 border-2 min-h-[90px] flex items-center flex-wrap">
        <p>{comment}</p>
    </div>
  )
}

export default Comment