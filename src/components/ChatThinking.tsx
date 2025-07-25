import React from 'react'

const ChatThinking = () => {
    return (
        <div className="flex gap-[11px] items-center">
            <img
                src="images/nikke/rapi2.webp"
                alt=""
                className="rounded-full shrink-0 mb-[2px] object-cover w-[35px] h-[35px]"
            />
            <div className="message-text py-[2px] px-[16px] max-w-[75%] text-[0.95rem] bg-[#F2F2FF] rounded-[13px] rounded-bl-[3px]">
                <div className="thinking-indicator flex gap-[4px] py-[15px]">
                    <div className="dot h-[7px] w-[7px] rounded-full bg-[#6F6BC2] dot-pulse-animation"></div>
                    <div className="dot h-[7px] w-[7px] rounded-full bg-[#6F6BC2] dot-pulse-animation"></div>
                    <div className="dot h-[7px] w-[7px] rounded-full bg-[#6F6BC2] dot-pulse-animation"></div>
                </div>
            </div>
        </div>
    )
}

export default ChatThinking