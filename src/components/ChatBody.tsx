import React from 'react'
import ChatMessage from './ChatMessage';
import { Message } from '@/app/rapi-chat/page';
import ChatThinking from './ChatThinking';

type ChatBodyProps = {
    messages: Message[];
    thinking: boolean;
};

const ChatBody = ({ messages, thinking }: ChatBodyProps) => {
    return (
        <div>
            <img
                src="images/nikke/rapi2.webp"
                alt=""
                className="object-cover absolute insert-0 h-[100%] w-[100%] brightness-[30%] opacity-[50%] z-0 pointer-events-none:"
            />

            <div className="relative z-10 py-[25px] px-[22px] flex gap-[20px] sm:h-[460px] h-[calc(90vh-80px)] mb-[82px] sm:mt-0 mt-[70px] overflow-y-auto flex-col">
                {messages.map((message, i) => <ChatMessage key={i} message={message} />)}
                {thinking && (<ChatThinking />)}
            </div>
        </div>
    )
}

export default ChatBody