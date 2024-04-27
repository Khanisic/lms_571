import React from 'react'

const assignments = [
  {
    "name": "Homework 4",
    "deadline": "26th May 2024"
  },
  {
    "name": "Homework 3",
    "deadline": "16th May 2024"
  },
  {
    "name": "Homework 2",
    "deadline": "6th May 2024"
  },
  {
    "name": "Homework 1",
    "deadline": "21th April 2024"
  },
  {
    "name": "XAMPP Setup",
    "deadline": "17th April 2024"
  },
]
function Assignments() {
  return (
    <div className='flex flex-col w-full pr-10 py-10 gap-3'>
      {
        assignments.map((assignment, index) => {
          return (
            <div key={index} className='bg-dark w-full py-3 px-4 rounded-lg'>
              <div className='flex text-white font-chill justify-between'>
                <p>{assignment.name}</p>
                <p>{assignment.deadline}</p>
                <p className='bg-secondary px-4 rounded-md text-dark hover:bg-blood hover:text-white duration-150 transition-all ease-in-out cursor-pointer'>Details</p>
                <p className='bg-blood px-4 rounded-md text-white hover:bg-secondary hover:text-dark duration-150 transition-all ease-in-out cursor-pointer'>Submit</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Assignments