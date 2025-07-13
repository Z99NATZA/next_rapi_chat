'use client'
import api from '@/utils/axios';
import React, { KeyboardEvent, useCallback, useRef, useState } from 'react'

type Message = {
    type: 'user' | 'bot',
    content: string,
}; 

interface ChatRequest {
    message: string
}

interface ChatResponse {
    reply: string
}

const RapiChat = () => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const chatBodyRef = useRef<HTMLDivElement | null>(null);
    const [thinking, setThinking] = useState(false);

    const messageKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
        const message = textareaRef.current?.value.trim() || '';

        if (e.key === 'Enter' && !e.shiftKey && message) {
            e.preventDefault();

            sendMessage(message);
        }
    }, []);

    const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const message = textareaRef.current?.value.trim() || '';

        sendMessage(message);
    }

    const sendMessage = async (message: string) => {
        textareaRef.current!.value = '';

        setMessages((prev) => [...prev, {
            type: 'user',
            content: message
        }]);

        setThinking(true);

        try {
            const payload: ChatRequest = { message: message };
            const res = await api.post<ChatResponse>('/api/chat', payload);
            const reply = res.data.reply;

            setMessages((prev) => [...prev, {
                type: 'bot',
                content: reply
            }]);
        }
        catch (err: unknown) {
            if (err instanceof Error) console.log(err.message);
        }
        finally {
            setThinking(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#EEEEFF] to-[#C8C7FF]">
            <div>
                <div 
                    className="chatbot-popup sm:relative absolute h-[100%] sm:h-auto w-[100%] sm:w-[420px] right-0 bottom-0 bg-white overflow-hidden sm:rounded-[15px] rounded-0"
                    style={{
                        boxShadow: '0 0 128px 0 rgba(0, 0, 0, 0.1), 0 32px 64px -48px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <div className='sm:relative fixed w-full'>
                        <div className="chat-header flex items-center justify-between bg-[#5350C4] h-[70px] px-[22px]">
                            <div className="chat-info flex gap-[10px] items-center">
                                <img
                                    src="images/nikke/rapi.jpg"
                                    width={35}
                                    height={35}
                                    alt=""
                                    className='chatbot-logo rounded-full'
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
                    {/* End... <div className="chat-header */}

                    <div ref={chatBodyRef} className="chat-body py-[25px] px-[22px] flex gap-[20px] sm:h-[460px] h-[calc(90%-80px)] mb-[82px] sm:mt-0 mt-[70px] overflow-y-auto flex-col">
                        {messages.map((msg, index) => (
                            <div 
                                key={index}
                                className={`
                                    flex gap-[11px] items-center
                                    ${msg.type === 'user' ? 'items-end flex-col' : ''}
                                `}
                            >
                                <img
                                    src="images/nikke/rapi.jpg"
                                    width={35}
                                    height={35}
                                    alt=""
                                    className={`
                                        bot-avatar rounded-full shrink-0 mb-[2px]
                                        ${msg.type !== 'bot' ? 'hidden' : ''}    
                                    `}
                                />
                                <div 
                                    className={`
                                       py-[12px] px-[16px] max-w-[75%] text-[0.95rem] bg-[#F2F2FF] rounded-[13px]
                                        ${msg.type === 'bot' ? 'rounded-bl-[3px]' : 'rounded-br-[3px]'}
                                    `}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        
                        <div className={`gap-[11px] items-center ${thinking ? 'flex' : 'hidden'}`}>
                            <img
                                src="images/nikke/rapi.jpg"
                                width={35}
                                height={35}
                                alt=""
                                className='bot-avatar rounded-full shrink-0 mb-[2px]'
                            />
                            <div className="message-text py-[2px] px-[16px] max-w-[75%] text-[0.95rem] bg-[#F2F2FF] rounded-[13px] rounded-bl-[3px]">
                                <div className="thinking-indicator flex gap-[4px] py-[15px]">
                                    <div className="dot h-[7px] w-[7px] rounded-full bg-[#6F6BC2] dot-pulse-animation"></div>
                                    <div className="dot h-[7px] w-[7px] rounded-full bg-[#6F6BC2] dot-pulse-animation"></div>
                                    <div className="dot h-[7px] w-[7px] rounded-full bg-[#6F6BC2] dot-pulse-animation"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* End... <div className="chat-body */}

                    <div className="chat-footer fixed sm:absolute bottom-0 w-[100%] bg-white pt-[15px] px-[22px] pb-[20px]">
                        <form 
                            onSubmit={onSendMessage}
                            action="#" 
                            className='
                                chat-form flex items-center bg-white rounded-[32px] outline-[1px] outline-[#ccc]
                                focus-within:outline-[2px] focus-within:outline-[#5350C4]
                            '
                        >
                            <textarea
                                ref={textareaRef}
                                placeholder='Message...'
                                className='
                                    message-input outline-none h-[47px] w-[100%] text-[0.95rem] 
                                    p-[14px] resize-none overflow-hidden
                                '
                                style={{ 'borderRadius': 'inherit' }}
                                required
                                onKeyDown={messageKeyDown}
                            ></textarea>

                            <div className="chat-controls flex items-center self-end pr-[6px] h-[47px] gap-[3px]">
                                <button 
                                    type='button'
                                    className="
                                        material-symbols-rounded h-[35px] w-[35px] cursor-pointer text-[#706DB0] rounded-full
                                        text-[1.15rem] hover:bg-[#f1f1ff]
                                    "
                                >
                                    add_reaction
                                </button>

                                <button 
                                    type='button'
                                    className="
                                        material-symbols-rounded h-[35px] w-[35px] cursor-pointer text-[#706DB0] rounded-full
                                        text-[1.15rem] hover:bg-[#f1f1ff]
                                    "
                                >
                                    attach_file
                                </button>

                                <button
                                    id='send-message'
                                    type='submit'
                                    className="
                                        material-symbols-rounded h-[35px] w-[35px] cursor-pointer rounded-full
                                        text-[1.15rem] hover:bg-[#3d39ac] text-white bg-[#5350C4] 
                                    "
                                    style={{ 'display': 'none' }}
                                    onClick={() => onSendMessage}
                                >
                                    arrow_upward
                                </button>

                            </div>
                            {/* End... <div className="chat-controls */}

                        </form>
                    </div>
                    {/* End... <div className="chat-footer */}

                </div>
                {/* End... <div className="chatbot-popup */}

            </div>
        </div>
    )
}

export default RapiChat
