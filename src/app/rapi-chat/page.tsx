'use client'
import ChatBody from '@/components/ChatBody';
import ChatFooter from '@/components/ChatFooter';
import ChatHeader from '@/components/ChatHeader';
import api from '@/utils/axios';
import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'

export type Message = {
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
    const [thinking, setThinking] = useState(false);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<File | null>(null);

    const messageKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
        const message = textareaRef.current?.value.trim() || '';

        if (e.key === 'Enter' && !e.shiftKey && message) {
            e.preventDefault();

            sendMessage(message);
        }
    }, []);

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
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
            // const res = await api.post<ChatResponse>('/api/chat', payload);
            // const reply = res.data.reply;
            const reply = 'ok';

            setTimeout(() => {
                setMessages((prev) => [...prev, {
                    type: 'bot',
                    content: reply
                }]);
            }, 1000);
        }
        catch (err: unknown) {
            if (err instanceof Error) console.log(err.message);
        }
        finally {
            setThinking(false);
        }
    }

    const handleFileUploadClick = () => {
        imageInputRef.current?.click();
    }

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result as string;

            setMessages((prev) => [...prev, {
                type: 'user',
                content: `<img src="${imageUrl}" alt="uploaded" style="display: block; margin-left: auto; width: 50%; border-radius: 13px 13px 3px 13px; margin-top: -7px;" />`
            }]);
        };

        reader.readAsDataURL(file);
    }

    const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (file) {
            setImage(file);
        }
    }

    useEffect(() => {
        console.log(image);
    }, [image])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#EEEEFF] to-[#C8C7FF]">
            <div 
                className="chatbot-popup sm:relative absolute h-[100%] sm:h-auto w-[100%] sm:w-[420px] right-0 bottom-0 bg-white overflow-hidden sm:rounded-[15px] rounded-0"
                style={{
                    boxShadow: '0 0 128px 0 rgba(0, 0, 0, 0.1), 0 32px 64px -48px rgba(0, 0, 0, 0.5)',
                }}
            >
                <ChatHeader />
                <ChatBody messages={messages} thinking={thinking} />
                <ChatFooter
                    onSend={handleSendMessage}
                    onKeyDown={messageKeyDown}
                    onUpload={handleFileUploadClick}
                    onFileChange={handleAddImage}
                    textareaRef={textareaRef}
                    imageInputRef={imageInputRef}
                />
            </div>
        </div>
    )
}

export default RapiChat
