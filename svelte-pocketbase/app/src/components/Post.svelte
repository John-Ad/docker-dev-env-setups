<script lang="ts">
    import pb from "../api/pb";
    import type { IPost } from "../interfaces/interfaces";

    export let post: IPost;
    export let refresh: any;

    const likePost = async () => {
        if (post.likes.find((v) => v === pb.authStore.model.id)) {
            alert("Already liked");
            return;
        }

        try {
            await pb.collection("posts").update(post.id, {
                likes: [...post.likes, pb.authStore.model.id],
                dislikes: post.dislikes.filter(
                    (v) => v !== pb.authStore.model.id
                ),
            });
            refresh();
        } catch (e) {
            console.log(e);
            alert("Failed to like post");
        }
    };

    const dislikePost = async () => {
        if (post.dislikes.find((v) => v === pb.authStore.model.id)) {
            alert("Already disliked");
            return;
        }

        try {
            await pb.collection("posts").update(post.id, {
                dislikes: [...post.dislikes, pb.authStore.model.id],
                likes: post.likes.filter((v) => v !== pb.authStore.model.id),
            });
            refresh();
        } catch (e) {
            console.log(e);
            alert("Failed to dislike post");
        }
    };
</script>

<article class="post">
    <header>
        {post.created.substring(0, 19)}
    </header>
    {post.message}
    <footer>
        <div class="post-btns">
            <button on:click={() => likePost()}>
                Like:
                {post.likes.length}
            </button>
            <button on:click={() => dislikePost()}>
                Dislike:
                {post.dislikes.length}
            </button>
        </div>
    </footer>
</article>

<style>
    .post {
        width: 500px;
    }
    .post-btns {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }

    button {
        width: 200px;
    }
</style>
