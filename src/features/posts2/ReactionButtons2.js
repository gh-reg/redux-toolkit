import { useAddReactionMutation } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '💜',
    rocket: '🚀',
    coffee: '🍺'
};


const ReactionButtons = ( { post, className } ) => {
    // const [addReaction] = useAddReactionMutation();
    const hookResult = useAddReactionMutation();
    console.log( 'hookResult', hookResult );
    const [
        addReaction,
        {
            isError,
            isLoading,
            isSuccess,
            isUninitialized,
            status,
            originalArgs
        }
    ] = hookResult;

    const reactionButtons = Object.entries( reactionEmoji ).map( ( [name, emoji] ) => {
        return (
            <button
                key={name}
                type="button"
                className={className}
                onClick={() => {
                    const newValue = post.reactions[name] + 1;
                    console.log( 'calling addReaction:', { postId: post.id, reactions: { ...post.reactions, [name]: newValue } } );
                    addReaction( { postId: post.id, reactions: { ...post.reactions, [name]: newValue } } );
                    console.log( 'returned from addReaction:' );
                }}
            >
                {emoji} {post.reactions[name]}
            </button >
        );
    } );

    const args = originalArgs
        ? Object.entries( originalArgs ).map( ( [name, val] ) => {
            <div>name: {val}</div>;
        } )
        : 'N/A';

    return (
        <div>
            <div>status:{status}</div>
            <div>isError:{isError.toString()}</div>
            <div>isLoading:{isLoading.toString()}</div>
            <div>isSuccess:{isSuccess.toString()}</div>
            <div>isUninitialized:{isUninitialized.toString()}</div>
            <div>originalArgs:{args}</div>
            <div>{reactionButtons}</div>
        </div>
    );
};

export default ReactionButtons;
