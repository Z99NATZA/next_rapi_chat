'use client';

import { useState, ChangeEvent } from 'react';

export default function UploadImage() {
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return alert('Please select an image.');

        const formData = new FormData();
        formData.append('image', file);

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}
