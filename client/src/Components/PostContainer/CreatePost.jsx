import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { CREATE_POST } from '../../utils/mutations';
import { QUERY_ME, } from '../../utils/queries';
import Auth from '../../utils/auth';

import './PostStyle.css';

function CreatePost() {
    const userId = Auth.getProfile().data._id;

    const navigate = useNavigate();
    const location = useLocation();
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [addPost, { error }] = useMutation(CREATE_POST, { refetchQueries: ['getAllPosts'] });

    const { data: userData } = useQuery(QUERY_ME, { fetchPolicy: 'cache-and-network' });
    const user = userData?.me || {};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = null;

            if (file) {
                const cloudName = 'dotzqy61r';
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'dgayr62l');
                formData.append('api_key', '443559482432498');

                const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: 'POST',
                    body: formData
                });

                if (res.ok) {
                    const data = await res.json();
                    imageUrl = data.url;
                } else {
                    throw new Error('Failed to upload image.');
                }
            }

            const { data } = await addPost({
                variables: { text, imageUrl }
            });

            setText('');
            setFile(null)
            navigate('/home')
        } catch (err) {
            console.error('Error creating post: ', err);
        }
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div id="createPostBody" className="card createPost">
                    <div className="d-flex justify-content-start">
                        <h2 id="usernameHomepage">{user.username}</h2>
                    </div>
                    <div id="newPostContainer" className="d-flex justify-content-start mt-2">
                        <input id="newPost" type="text" className="form-control form-control-lg rounded-pill" placeholder="What's going on?" value={text} onChange={(e) => setText(e.target.value)} />
                    </div>
                    {file && (
                        <div id="previewImage" className="mt-2">
                            <img src={URL.createObjectURL(file)} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>
                    )}
                    <div id="fileInput" className="d-flex justify-content-start mt-2">
                        <input className="form-control rounded-pill" placeholder="Choose a file" type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div id="newPostBtn" className="d-flex justify-content-end mt-3">
                        <button type="submit" className="btn btn-dark rounded-pill w-25">Post</button>
                    </div>
                </div>
            </form>
        </>
    )
};

export default CreatePost;
