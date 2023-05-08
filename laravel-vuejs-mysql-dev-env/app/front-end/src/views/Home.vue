<script setup lang="ts">

import {onMounted, onUpdated, ref} from "vue";
import {ITask, TasksApi} from "../api/tasksApi.ts";

const loadingTasks = ref(false);
const addingTask = ref(false);
const showAddTaskDialog = ref(false);
const newTaskTitle = ref("");
const tasks = ref<ITask[]>([]);
const addTask = async () => {
    addingTask.value = true;
    const result = await TasksApi.add(5, newTaskTitle.value);
    addingTask.value = false;
    if (!result)
        return;

    showAddTaskDialog.value = false;
    getAllTasks();
}

const getAllTasks = async () => {
    loadingTasks.value = true;
    tasks.value = await TasksApi.getAllForUser(5);
    loadingTasks.value = false;
}

onMounted(() => {
    getAllTasks();
});
onUpdated(() => {
    console.log(tasks.value);
});
</script>

<template>
    <div class="home-header">
        <h1>Tasks</h1>
        <div>
            <v-btn color="success" @click="showAddTaskDialog = true">Add Task</v-btn>
            <v-dialog v-model="showAddTaskDialog" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Add Task</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field label="Title" v-model="newTaskTitle"></v-text-field>
                        <v-progress-circular color="primary" v-if="addingTask" indeterminate></v-progress-circular>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="showAddTaskDialog = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="addTask">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
    <hr class="home-header-underline">

    <div class="home-task-list">
        <v-progress-linear color="primary" v-if="loadingTasks" indeterminate></v-progress-linear>
        <v-list>
            <v-list-item v-for="task in tasks" :key="task.id">
                <p>{{ task.title }}</p>
            </v-list-item>
        </v-list>

        <h3 v-if="tasks.length===0&&!loadingTasks">No tasks found.</h3>
    </div>

</template>

<style scoped>

.home-header {
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.home-header-underline {
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
}

.home-task-list {
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
}

</style>
