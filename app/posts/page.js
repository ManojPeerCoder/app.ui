import Link from 'next/link';
import React from 'react';

export const getPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: "force-cache"
    })
    const data = await response.json()
    return data.slice(0, 3);
}

const PostList = async () => {
    const posts = await getPosts();

    return (
        <>
            <h1>List of Posts</h1>
            {
                posts?.map((post) => {
                    return (
                        <div key={post.id}>
                            <Link href={`posts/${post.id}`} passHref>
                                <h2>
                                    {post.id} {post.title}
                                </h2>
                            </Link>
                            <hr />
                        </div>
                    )
                })
            }
        </>
    )
}

export default PostList