import React from 'react'

const ChatHeader = () => {
    return (
        <div className='sm:relative fixed w-full'>
            <div className="chat-header flex items-center justify-between bg-[#5350C4] h-[70px] px-[22px]">
                <div className="chat-info flex gap-[10px] items-center">
                    <img
                        src="images/nikke/rapi2.webp"
                        alt=""
                        className='chatbot-logo rounded-full w-[35px] h-[35px] object-cover'
                    />
                    <h2 className="logo-text text-white text-[1.31rem] p-[6px] shrink-0">
                        Rapi
                    </h2>
                </div>

                <button
                    id='clost-chatbot'
                    className="
                        material-symbols-rounded text-white h-[40px] w-[40px] text-[1.9rem] me-[-10px]
                        pt-[2px] cursor-pointer rounded-full hover:bg-[#3d39ac] duration-200
                    "
                >
                    keyboard_arrow_down
                </button>
            </div>
        </div>
    )
}

export default ChatHeader