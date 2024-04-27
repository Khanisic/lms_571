import React from 'react'

const announcements = [
    {
        "title": "Attendance policy",
        "announcement": "I noticed that some students are missing classes. I am reminding my course attendance policy here. "
    },
    {
        "title": "VS Code installation link",
        "announcement": "Dear students, Please install VS code before tomorrow's class."
    },
    {
        "title": "NodeJS installation",
        "announcement": "Please install NodeJS before next class"
    },
]

function Announcements() {
    return (
        <div className='flex flex-col w-full pr-10 py-10 gap-3'>
            {
                announcements.map((announcement, index) => {
                    return (
                        <div key={index} className='bg-dark w-full py-3 px-4 rounded-lg'>
                            <div className='flex text-white flex-col font-chill justify-between'>
                                <p className='text-xl font-semibold'>{announcement.title}</p>
                                <p>{announcement.announcement}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Announcements