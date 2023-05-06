<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Get all tasks for a user successfully.
     */
    public function test_get_all_tasks_for_user_successful(): void
    {
        $response = $this->get('/api/tasks/1');

        $response->assertStatus(200);
    }

    /**
     * Add a new task successfully.
     */
    public function test_add_new_task_successful(): void
    {
        $response = $this->post('/api/tasks', [
            'userId' => 1,
            'title' => 'title'
        ]);

        $response->assertStatus(201);
    }

    /**
     * Add a new task failed, user ID is required.
     */
    public function test_add_new_task_failed_user_id_is_required(): void
    {
        $response = $this->post('/api/tasks', [
            'userId' => '',
            'title' => 'title'
        ]);

        $response->assertStatus(400);
    }

    /**
     * Add a new task failed, title is required.
     */
    public function test_add_new_task_failed_title_is_required(): void
    {
        $response = $this->post('/api/tasks', [
            'userId' => 1,
            'title' => ''
        ]);

        $response->assertStatus(400);
    }

    /**
     * Add a new task failed, user not found.
     */
    public function test_add_new_task_failed_user_not_found(): void
    {
        $response = $this->post('/api/tasks', [
            'userId' => 999,
            'title' => 'title'
        ]);

        $response->assertStatus(404);
    }

    /**
     * Update a task successfully.
     */
    public function test_update_task_successful(): void
    {
        $dt = Carbon::now();

        $response = $this->post('/api/tasks/1', [
            'title' => 'title',
            'completed_at' => $dt->toString(),
            'position' => 3
        ]);

        $response->assertStatus(200);
    }

    /**
     * Update a task failed, task not found.
     */
    public function test_update_task_failed_task_not_found(): void
    {
        $dt = Carbon::now();

        $response = $this->post('/api/tasks/999', [
            'title' => 'title',
            'completed_at' => $dt->toString(),
            'position' => 3
        ]);

        $response->assertStatus(404);
    }

    /**
     * Delete a task successfully.
     */
    public function test_delete_task_successful(): void
    {
        $response = $this->delete('/api/tasks/2');

        $response->assertStatus(200);
    }

    /**
     * Delete a task failed, task not found.
     */
    public function test_delete_task_failed_task_not_found(): void
    {
        $response = $this->delete('/api/tasks/999');

        $response->assertStatus(404);
    }
}











