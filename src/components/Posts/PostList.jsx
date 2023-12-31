import React from 'react';
import Post from './Post';
import postData from '../../constants/posts';

const PostList = () => {

    return (
        <div className="ml-[70px] mr-3 mt-3">
            <div className=" grid grid-cols-2 gap-4">
                {postData.map((post, index) => (
                    <Post
                        key={index}
                        title={post.title}
                        author={post.author}
                        views={post.views}
                        likes={post.likes}
                        comments={post.comments}
                        thumbnailUrl={post.thumbnailUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostList;
