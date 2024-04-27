import React from 'react'

function Todo() {
    return (
        <div className='flex flex-col justify-center items-center py-20 gap-4 px-4'>
            <p className='text-white font-funky text-4xl'>To-do</p>
            <div className='flex gap-3 flex-col items-stretch justify-stretch w-full'>
                <div className='bg-darker w-full flex justify-center items-center rounded-lg py-2'>
                    <p className='text-white font-funky text-lg'>CS 535 Assignment 3</p>
                </div>
                <div className='bg-darker w-full flex justify-center items-center rounded-lg py-2'>
                    <p className='text-white font-funky text-lg'>CS 535 Assignment 2</p>
                </div>
                <div className='bg-darker w-full flex justify-center items-center rounded-lg py-2'>
                    <p className='text-white font-funky text-lg'>CS 571 HW 2</p>
                </div>
            </div>
        </div>
    )
}

export default Todo