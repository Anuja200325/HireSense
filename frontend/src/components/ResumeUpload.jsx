import React, { useState } from 'react';

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please select a resume file.");
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/api/upload-resume/', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                setMessage("Resume uploaded successfully.");
                setFile(null);
            } else {
                const data = await response.json();
                setMessage(`Upload failed: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            setMessage(`Upload error: ${error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
            </form>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
};

export default ResumeUpload;
