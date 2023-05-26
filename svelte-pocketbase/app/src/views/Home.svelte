<script lang="ts">
    import { onMount } from "svelte";
    import pb from "../api/pb";
    import type { IPost } from "../interfaces/interfaces";
    import { push } from "svelte-spa-router";
    import { PlusCircle } from "svelte-bootstrap-icons";

    let posts: IPost[] = [];
    let addingPost = false;
    let postContent = "";

    const getPosts = async () => {
        const posts = await pb.collection("posts").getFullList({
            sort: "-created",
        });
        console.log(posts);
    };

    const addPost = async (event: Event) => {
        event.preventDefault();

        try {
            const post = await pb.collection("posts").create({
                userId: pb.authStore.model.id,
                message: postContent,
                likes: [],
                dislikes: [],
            });
            console.log(post);
            getPosts();
        } catch (e) {
            alert("Failed to add post");
        }
    };

    onMount(() => {
        if (!pb.authStore.isValid) {
            push("/login");
        }

        getPosts();
    });
</script>

<div class="post-container">
    <div class="posts-header">
        <h1>Posts</h1>
        <button
            on:click={() => {
                addingPost = true;
            }}
            class="add-button"
        >
            <PlusCircle width={24} height={24} fill="green" />
        </button>
    </div>
    <div class="post-list">
        {#each posts as post}
            <div class="post">
                <h2>{post.message}</h2>
            </div>
        {/each}
    </div>

    {#if addingPost}
        <dialog>
            <article>
                <header>
                    <a href="#close" aria-label="Close" class="close" />
                    New Post
                </header>
                <form on:submit={(e) => addPost(e)}>
                    <label for="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        cols="50"
                        bind:value={postContent}
                    />
                    <button type="submit">Submit</button>
                </form>
            </article>
        </dialog>
    {/if}
</div>

<style>
    .post-container {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 30px;
    }
    h1 {
        margin: 0;
    }
    .add-button {
        background-color: white;
        border: none;
        margin: 0;
        padding: 0;
        width: fit-content;
    }
    .posts-header {
        width: 300px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
</style>
