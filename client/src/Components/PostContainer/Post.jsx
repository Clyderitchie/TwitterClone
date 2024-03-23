import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_USER } from '../../utils/queries';

import Auth from '../../utils/auth';
import LikeBtn from '../LikeButton/LikeBtn';
import Comment from '../Coments/Comment';

import './PostStyle.css';

function Post({ creatorId }) {
    const userId = Auth.getProfile().data._id;

    const [postsData, setPostsData] = useState([]);
    const { data, loading } = useQuery(QUERY_POSTS, { fetchPolicy: 'cache-and-network' });

    useEffect(() => {
        if (data && data.getAllPosts) {
            setPostsData(data.getAllPosts);
        }
    }, [data]);

    // console.log("All post: ", data);

    if (loading) {
        return <h3>Loading posts...</h3>
    };

    return (
        <>
            {postsData.toReversed().map((post) => (
                <div id="postBody" className="card mb-4" key={post._id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-start">
                            <h6 id="postCreator">@
                                <a id="postCreaterProfile" href={`/users/${userId}`}>
                                    {post.userId.username}
                                </a>
                            </h6>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p id="postText">{post.text}</p>
                        </div>
                        {post.imageUrl && (
                            <div className="d-flex justify-content-center">
                                <img src={post.imageUrl} alt="Post" style={{ maxWidth: '100%', height: 'auto' }} />
                            </div>
                        )}
                        <div className="d-flex justify-content-start">
                            <p id="postCreatedAt">{post.createdAt}</p>
                        </div>
                        <div className="d-flex justify-content-around">
                            <div>
                                <LikeBtn postId={post._id} initialLikes={post.likes.length} />
                            </div>
                            <div>
                                <Comment postId={post._id}/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
};

export default Post;