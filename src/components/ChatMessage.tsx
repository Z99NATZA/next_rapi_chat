import { Message } from '@/app/rapi-chat/page';
import React from 'react'


type ChatMessageProps = {
    message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
    const isImage = /^<img[\s\S]*?>$/.test(message.content.trim());
 
    return (
        <div className={`flex gap-[11px] items-center ${message.type === 'user' ? 'justify-end' : ''}`}>
            {message.type === 'bot' && (
                <img
                    src="images/nikke/rapi2.webp"
                    alt=""
                    className="rounded-full shrink-0 mb-[2px] object-cover w-[35px] h-[35px]"
                />
            )}

            {isImage && (
                <div style={{ 'maxHeight': '200px', 'overflowY': 'auto' }}>
                    <div dangerouslySetInnerHTML={{ __html: message.content }}></div>
                </div>
            )}

            {!isImage && (
                <div className={`
                    py-[12px] px-[16px] max-w-[75%] text-[0.95rem] rounded-[13px]
                    ${
                        message.type === 'bot' 
                        ? 'rounded-bl-[3px] bg-[#F2F2FF]' 
                        : (isImage ? '' : 'rounded-br-[3px] bg-[#5350C4] text-white')
                    }
                `}>
                    <div dangerouslySetInnerHTML={{ __html: message.content }}></div>
                </div>
            )}
        </div>         
    )
}

export default ChatMessage