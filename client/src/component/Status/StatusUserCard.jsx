import React from 'react'
import { useNavigate } from 'react-router-dom'

const StatusUserCard = () => {
  const navigate = useNavigate();

  const handleNavigates = ()=> {
    navigate(`/status/{userId}`)
  }
  return (
    <div onClick={handleNavigates} className='flex items-center p-3'>
      <div>
        <img className='h-7 w-7 lg:w-10 lg:h-10 rounded-full' src="https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg" alt="" />
      </div>
      <div className='ml-2 text-white'>
          <p>kousik manik</p>
      </div>
    </div>
  )
}

export default StatusUserCard
