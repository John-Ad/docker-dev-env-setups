<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
    <v-app>
        <Navbar/>
        <div class="main-container">
            <router-view></router-view>
        </div>
    </v-app>
</template>

<style scoped>
.main-container {
    margin-top: 100px;
}

.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
