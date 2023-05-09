<script setup lang="ts">

import {ITask, TasksApi} from "../api/tasksApi.ts";
import {
    mdiCheckboxBlankOutline,
    mdiCheckboxMarkedOutline,
    mdiDragVertical,
    mdiPencil,
    mdiTrashCanOutline
} from "@mdi/js";
import {ref} from "vue";

const props = defineProps<{
    task: ITask,
    refreshTasks: () => void
}>();

const newTitle = ref(props.task.title);
const editingTitle = ref(false);
const savingTitle = ref(false);


const deleteTask = async () => {
    if (!confirm("Are you sure you want to delete this task?"))
        return;
    const result = await TasksApi.delete(props.task.id);
    if (!result)
        return;
    props.refreshTasks();
}

const updateTask = async (id: number, title?: string, description?: string, position?: number, completed?: boolean): Promise<boolean> => {
    const result = await TasksApi.update(id, title, description, position, completed);
    if (!result)
        return false;

    props.refreshTasks();
    return true;
}

const editTitle = async () => {
    if (newTitle.value === "") {
        alert("Title cannot be empty");
        return;
    }

    if (newTitle.value === props.task.title) {
        editingTitle.value = false;
        return;
    }

    savingTitle.value = true;
    const result = await updateTask(props.task.id, newTitle.value, undefined, undefined, undefined);
    savingTitle.value = false;
    if (!result)
        return;

    editingTitle.value = false;
}

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
                <v-btn elevation="0" :icon="mdiPencil" class="edit-btn" @click="editingTitle=true"></v-btn>
                <v-btn elevation="0" :icon="mdiTrashCanOutline" class="delete-btn" @click="deleteTask"></v-btn>
                <v-btn elevation="0" :icon="mdiCheckboxBlankOutline" v-if="task.completed_at===null"></v-btn>
                <v-btn elevation="0" :icon="mdiCheckboxMarkedOutline" v-if="task.completed_at!==null"></v-btn>

                <v-dialog v-model="editingTitle" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Edit Task</span>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field label="Title" v-model="newTitle"></v-text-field>
                            <v-progress-circular color="primary" v-if="savingTitle" indeterminate></v-progress-circular>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="editingTitle = false">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="editTitle">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
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

.delete-btn {
    color: red;
}

.edit-btn {
    color: #17a2b8;
}

</style>
