import React, { useState } from 'react'

type ChatFooterProps = {
    onSend: (e: React.FormEvent<HTMLFormElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onUpload: () => void;
    onFileChange: (e: File | null) => void;
    imageInputRef: React.RefObject<HTMLInputElement | null>;
    showButtonSubmit: boolean;
    messageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    messageText: string;
};

const ChatFooter = ({
    onSend,
    onKeyDown,
    onUpload,
    onFileChange,
    imageInputRef,
    showButtonSubmit,
    messageChange,
    messageText,
}: ChatFooterProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;

        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
            onFileChange(file);
        }
        else {
            setPreviewImage('');
        }
    }

    const handleMessageKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyDown(event);
    }

    const handleRemoveImage = () => {
        setPreviewImage('');
        onFileChange(null);
    }

    return (
        <div className="chat-footer z-10 fixed sm:absolute bottom-0 w-[100%] bg-white pt-[15px] px-[22px] pb-[20px]">
            <form 
                onSubmit={onSend}
                action="#" 
                className='
                    relative flex items-center bg-white rounded-[32px] outline-[1px] outline-[#ccc]
                    focus-within:outline-[2px] focus-within:outline-[#5350C4]
                '
            >
                {(previewImage) && (
                    <div className='absolute w-[50%] bottom-[calc(100%+20px)] right-[40px] p-3 bg-gray-100 rounded'>
                        <button
                            onClick={handleRemoveImage}
                            type='button'
                            className="
                                material-symbols-rounded text-red-500 h-[40px] w-[40px] text-[1.9rem] me-[-10px]
                                pt-[2px] cursor-pointer rounded-full bg-gray-100 hover:bg-gray-300 duration-200 absolute top-[-10px] right-0
                            "
                        >
                            close
                        </button>

                        <div className='max-h-[200px] overflow-y-auto'>
                            <img className='w-[100%]' src={previewImage} alt="" />
                        </div>
                    </div>
                )}

                <textarea
                    value={messageText}
                    placeholder='Message...'
                    className='
                        message-input outline-none h-[47px] w-[100%] text-[0.95rem] 
                        p-[14px] resize-none overflow-hidden
                    '
                    style={{ 'borderRadius': 'inherit' }}
                    onKeyDown={handleMessageKeydown}
                    onChange={messageChange}
                ></textarea>

                <div className="chat-controls flex items-center self-end pr-[6px] h-[47px] gap-[3px]">
                    <button 
                        type='button'
                        className="
                            material-symbols-rounded h-[35px] w-[35px] text-[#706DB0] rounded-full
                            text-[1.15rem] hover:bg-[#f1f1ff] opacity-[20%]
                        "
                    >
                        add_reaction
                    </button>

                    <div className='file-upload-wrapper'>
                        <input
                            ref={imageInputRef} 
                            onChange={handleImageChange}
                            type="file" 
                            accept='image/*' 
                            hidden 
                        />

                        <button 
                            onClick={onUpload}
                            type='button'
                            className="
                                material-symbols-rounded h-[35px] w-[35px] cursor-pointer text-[#706DB0] rounded-full
                                text-[1.15rem] hover:bg-[#f1f1ff]
                            "
                        >
                            imagesmode
                        </button>
                    </div>

                    {showButtonSubmit && (
                        <button
                            type='submit'
                            className="
                                material-symbols-rounded h-[35px] w-[35px] cursor-pointer rounded-full
                                text-[1.15rem] hover:bg-[#3d39ac] text-white bg-[#5350C4] 
                            "
                        >
                            arrow_upward
                        </button>
                    )}

                </div>

            </form>
        </div>
    )
}

export default ChatFooter