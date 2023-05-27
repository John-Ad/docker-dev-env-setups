<script lang="ts">
    import type { IPost } from "../interfaces/interfaces";

    export let post: IPost;
</script>

<article class="post">
    <header>
        {post.created.substring(0, 19)}
    </header>
    {post.message}
    <footer>
        <div class="post-btns">
            <button>
                Like:
                {post.likes.length}
            </button>
            <button>
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
