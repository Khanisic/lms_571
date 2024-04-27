import Image from 'next/image'
import React from 'react'
import dbms_img from '../../dashboard/_images/571.svg'

function Introduction() {
  return (
    <div className='flex flex-col w-full pr-10 py-10'>
      <div className='flex w-full'>
        <div className='w-2/3 bg-white px-8 py-10 rounded-bl-xl rounded-tl-xl'>
          <p className='font-funky text-2xl'>About:</p>
          <p className='font-funky mb-10'>Relational database design, including entity relationship modeling and normalization. Structured query language (SQL) for creating and querying databases. Other topics include the theory of relational databases, including relational algebra, various loading and reporting utilities, and the implementation of database management systems, e.g., how query optimization works.</p>
          <p className='bg-blood px-6 cursor-pointer hover:bg-dark hover:text-secondary transition-all ease-in-out duration-200 py-1 w-fit font-funky text- text-xl text-white rounded-lg'>Syllabus</p>
        </div>
        <div className='w-1/3'>
          <Image src={dbms_img} alt='dbms_image' className='w-full h-full object-cover rounded-tr-xl rounded-br-xl' />
        </div>
      </div>
    </div>
  )
}

export default Introduction