                {/* [Chat footer] */}
                <div className="chat-footer fixed sm:absolute bottom-0 w-[100%] bg-white pt-[15px] px-[22px] pb-[20px]">
                    <form 
                        onSubmit={handleSendMessage}
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

                        {/* [Chat control] */}
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

                            <div className='file-upload-wrapper'>
                                <input
                                    ref={imageInputRef} 
                                    onChange={handleAddImage}
                                    type="file" 
                                    accept='images/*' 
                                    hidden 
                                />

                                <button 
                                    onClick={handleFileUploadClick}
                                    type='button'
                                    className="
                                        material-symbols-rounded h-[35px] w-[35px] cursor-pointer text-[#706DB0] rounded-full
                                        text-[1.15rem] hover:bg-[#f1f1ff]
                                    "
                                >
                                    attach_file
                                </button>
                            </div>


                            <button
                                id='send-message'
                                type='submit'
                                className="
                                    material-symbols-rounded h-[35px] w-[35px] cursor-pointer rounded-full
                                    text-[1.15rem] hover:bg-[#3d39ac] text-white bg-[#5350C4] 
                                "
                                style={{ 'display': 'none' }}
                                onClick={() => handleSendMessage}
                            >
                                arrow_upward
                            </button>

                        </div>
                        {/* End... [Chat control] */}

                    </form>
                </div>
                {/* End... [Chat footer] */}