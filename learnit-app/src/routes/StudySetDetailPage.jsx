/* eslint-disable no-unused-vars */
import React from 'react'
import { useLocation } from 'react-router-dom'

const StudySetDetailPage = () => {

  const location = useLocation()
  const { studySetData } = location.state || {}

  return (
    <div className='h-screen bg-cstm_bg_dark text-cstm_white font-poppins'>
      <h1 className='text-3xl'>{studySetData?.name || 'DATA NOT FOUND'}</h1>
    </div>
  )
}

export default StudySetDetailPage