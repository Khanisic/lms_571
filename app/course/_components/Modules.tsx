import React from 'react'

const modules = [
  {
    "name": "Chapter 4",
    "deadline": "26th May 2024"
  },
  {
    "name": "Chapter 3",
    "deadline": "16th May 2024"
  },
  {
    "name": "Chapter 2",
    "deadline": "6th May 2024"
  },
  {
    "name": "Chapter 1",
    "deadline": "21th April 2024"
  }
]

function Modules() {
  return (
    <div className='flex flex-col w-full pr-10 py-10 gap-3'>
      {
        modules.map((module, index) => {
          return (
            <div key={index} className='bg-dark w-full py-3 px-4 rounded-lg'>
              <div className='flex text-white font-chill justify-between'>
                <p>{module.name}</p>
                <p>{module.deadline}</p>
                <p className='bg-secondary px-4 rounded-md text-dark hover:bg-blood hover:text-white duration-150 transition-all ease-in-out cursor-pointer'>Download</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Modules