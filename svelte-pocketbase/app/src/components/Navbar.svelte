<script lang="ts">
    import { link } from "svelte-spa-router";
</script>

<nav>
    <ul>
        <li><strong>Brand</strong></li>
    </ul>
    <ul>
        <li><a href="/" use:link>Home</a></li>
        <li><a href="/login" use:link>login</a></li>
        <li><a href="/register" use:link>register</a></li>
    </ul>
</nav>

<style>
    nav {
        padding-left: 3rem;
        padding-right: 3rem;
        border-bottom: 1px solid #ccc;
    }
</style>
