import React from 'react'

const quizzes = [
  {
    "name": "Quiz 4",
    "deadline": "26th May 2024"
  },
  {
    "name": "Quiz 3",
    "deadline": "16th May 2024"
  },
  {
    "name": "Quiz 2",
    "deadline": "6th May 2024"
  },
  {
    "name": "Quiz 1",
    "deadline": "21th April 2024"
  }
]

function Quizzes() {
  return (
    <div className='flex flex-col w-full pr-10 py-10 gap-3'>
      {
        quizzes.map((quiz, index) => {
          return (
            <div key={index} className='bg-dark w-full py-3 px-4 rounded-lg'>
              <div className='flex text-white font-chill justify-between'>
                <p>{quiz.name}</p>
                <p>{quiz.deadline}</p>
                <p className='bg-secondary px-4 rounded-md text-dark hover:bg-blood hover:text-white duration-150 transition-all ease-in-out cursor-pointer'>Details</p>
                <p className='bg-blood px-4 rounded-md text-white hover:bg-secondary hover:text-dark duration-150 transition-all ease-in-out cursor-pointer'>Start</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Quizzes