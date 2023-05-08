<script setup lang="ts">

import {ITask} from "../api/tasksApi.ts";
import {
    mdiCheckboxBlankOutline,
    mdiCheckboxMarkedOutline,
    mdiDragVertical,
    mdiPencil,
    mdiTrashCanOutline
} from "@mdi/js";

const props = defineProps<{ task: ITask }>();

</script>

<template>
    <v-container class="task-container">
        <v-row no-gutters class="task-row">
            <v-col cols="1">
                <v-btn elevation="0" :icon="mdiDragVertical"></v-btn>
            </v-col>
            <v-col cols="4">
                <p>{{ task.title }}</p>
            </v-col>
            <v-col>
                <v-btn elevation="0" :icon="mdiPencil"></v-btn>
                <v-btn elevation="0" :icon="mdiTrashCanOutline"></v-btn>
                <v-btn elevation="0" :icon="mdiCheckboxBlankOutline"></v-btn>
                <v-btn elevation="0" :icon="mdiCheckboxMarkedOutline"></v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

.task-container {
    border-bottom: 1px solid #e0e0e0;
    padding: 1rem 0;
}

.task-row {
    width: 1000px;
    align-items: center;
}

</style>
