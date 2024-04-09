import React from 'react'
import logoKarim from '../assets/images/logoKarim.png'


const Mantenimiento = () => {
  return (
    <>
      <div className='flex  flex-col items-center justify-center min-h-screen'>
        <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
          <img src={logoKarim}></img>
          <div className='flex flex-col justify-center text-center p-8 md:p-14'>
            <span className='mb-3 text-4xl font-bold'>404</span>
            <span className='font-light text-gray-400 mb-8'>
              Esta página no existe para el proyecto de Karimnot
            </span>
          </div>

        </div>


      </div>

    </>
  )
}

export default Mantenimiento;
