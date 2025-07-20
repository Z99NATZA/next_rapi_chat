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
        <div className="chat-body py-[25px] px-[22px] flex gap-[20px] sm:h-[460px] h-[calc(90%-80px)] mb-[82px] sm:mt-0 mt-[70px] overflow-y-auto flex-col">
            {messages.map((message, i) => <ChatMessage key={i} message={message} />)}
            {thinking && (<ChatThinking />)}
        </div>
    )
}

export default ChatBody