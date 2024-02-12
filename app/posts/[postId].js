
export const getPost = async (postId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        cache: "force-cache"
    })
    const data = await response.json()
    return data;
}

const Post = async ({ params }) => {

    const postDetails = await getPost(params.postId);

    return (
        <>
            <h2>
                {postDetails?.id} {postDetails?.title}
            </h2>
            <p>{postDetails?.body}</p>
        </>
    )
}

export default Post