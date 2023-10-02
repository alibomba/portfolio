type Review = {
    id: string,
    user_id: string,
    rate: number,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    product_id: string,
    user: {
        id: string,
        username: string,
        profile_picture: string | null
    },
    isMine: boolean,
    isLiked: boolean,
    isDisliked: boolean
}