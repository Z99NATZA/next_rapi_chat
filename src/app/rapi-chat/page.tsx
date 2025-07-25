'use client'
import ChatBody from '@/components/ChatBody';
import ChatFooter, {ChatFooterRef} from '@/components/ChatFooter';
import ChatHeader from '@/components/ChatHeader';
import api from '@/utils/axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'

export type Message = {
    type: 'user' | 'bot',
    content: string,
}; 

interface ChatResponse {
    reply: string
}

const RapiChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [thinking, setThinking] = useState(false);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const [fileImage, setIFileImage] = useState<File | null>(null);
    const [showButtonSubmit, setShowButtonSubmit] = useState(false);
    const [messageText, setMessaageText] = useState<string>('');
    const chatFooterRef = useRef<ChatFooterRef>(null);

    useEffect(() => {
        setMessages([{
            type: 'bot',
            content: 'ผู้บัญชาการ'
        }])
    }, [])

    useEffect(() => {
        setShowButtonSubmit(!!(messageText || fileImage));
    }, [
        messageText,
        fileImage
    ])

    const messageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const message = value.trim() === '' ? '' : value;
        setShowButtonSubmit(message !== '');
        setMessaageText(message);
    }

    const sendMessage = async () => {
        if (!messageText && !fileImage) {
            console.log('Require message');
            return;
        }

        const formData = new FormData();
        formData.append("message", messageText);

        if (fileImage) {
            formData.append("image", fileImage);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
    
                setMessages((prev) => [...prev, {
                    type: 'user',
                    content: `
                        <img src="${imageUrl}" alt="uploaded" style="display: block; margin-left: auto; width: 50%; border-radius: 13px; border-bottom-right-radius: 3px;" />
                    `
                }]);
            };

            reader.readAsDataURL(fileImage);
        }

        if (messageText) {
            setMessages((prev) => [...prev, {
                type: 'user',
                content: messageText
            }]);
        }
 
        setThinking(true); 
        setMessaageText('');
        setIFileImage(null);
        setShowButtonSubmit(false);
        chatFooterRef.current?.setPreviewImage('');

        try {
            const res = await api.post<ChatResponse>('/api/chat', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
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

    const messageKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }, [messageText]);

    const handleSendMessage = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendMessage();
    }, [sendMessage]);

    const handleFileUploadClick = useCallback(() => {
        imageInputRef.current?.click();
    }, []);

    const handleAddImage = useCallback((file: File | null) => {
        setIFileImage(file);
    }, []);

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
                    ref={chatFooterRef}
                    onSend={handleSendMessage}
                    onKeyDown={messageKeyDown}
                    onUpload={handleFileUploadClick}
                    onFileChange={handleAddImage}
                    imageInputRef={imageInputRef}
                    showButtonSubmit={showButtonSubmit}
                    messageChange={messageChange}
                    messageText={messageText}
                />
            </div>
        </div>
    )
}

export default RapiChat
