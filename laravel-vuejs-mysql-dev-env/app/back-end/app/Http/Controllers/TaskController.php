<?php

namespace App\Http\Controllers;

use App\Models\ApiResponse;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Get all tasks for a user
     * @param Request $request
     * @param int $id User ID
     * @return JsonResponse
     */
    public function getAllForUser(Request $request, int $id): JsonResponse
    {
        try {
            $tasks = Task::query()->where('user_id', $id)
                ->orderBy('position', 'asc')
                ->get();

            return response()->json(
                new ApiResponse($tasks, ""),
                200
            );
        } catch (\Exception $e) {
            report($e);
            return response()->json(
                new ApiResponse(500, "Server error"),
                500
            );
        }
    }

    /**
     * Add a new task
     * @param Request $request
     * @return JsonResponse
     */
    public function add(Request $request): JsonResponse
    {
        try {
            if (!$request->userId) {
                return response()->json(
                    new ApiResponse(400, "User ID is required"),
                    400
                );
            }
            if (!$request->title) {
                return response()->json(
                    new ApiResponse(400, "Title is required"),
                    400
                );
            }

            $user = User::query()->where('id', $request->userId)->first();
            if (!$user) {
                return response()->json(
                    new ApiResponse(404, "User not found"),
                    404
                );
            }

            $position = Task::query()->where('user_id', $request->userId)->count();

            $task = new Task();
            $task->user_id = $request->userId;
            $task->title = $request->title;
            $task->position = $position + 1;
            $task->save();

            return response()->json(
                new ApiResponse($task, ""),
                201
            );
        } catch (\Exception $e) {
            report($e);
            return response()->json(
                new ApiResponse(500, "Server error"),
                500
            );
        }
    }

    /**
     * Update a task
     * @param Request $request
     * @param int $id Task ID
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $task = Task::query()->where('id', $id)->first();

            if (!$task) {
                return response()->json(
                    new ApiResponse(404, "Task not found"),
                    404
                );
            }

            $task->title = $request->title ?? $task->title;

            if ($request->position) {
                if ($request->position < 1) {
                    return response()->json(
                        new ApiResponse(400, "Position must be greater than 0"),
                        400
                    );
                }
                $task->position = $request->position ?? $task->position;

                // update position of other tasks
                $tasksToUpdate = Task::query()
                    ->where('user_id', $task->user_id)
                    ->where('position', '>=', $task->position)
                    ->where('id', '!=', $task->id)
                    ->get();
                foreach ($tasksToUpdate as $taskToUpdate) {
                    $taskToUpdate->position = $taskToUpdate->position + 1;
                    $taskToUpdate->save();
                }
            }

            if ($request->completedAt) {
                //check if completed_at is valid datetime
                $dt = \DateTime::createFromFormat('Y-m-d H:i:s', $request->completedAt);
                if (!$dt) {
                    return response()->json(
                        new ApiResponse(400, "Invalid datetime format"),
                        400
                    );
                }
                $task->completed_at = $request->completedAt;
            }

            $task->save();

            return response()->json(
                new ApiResponse($task, ""),
                200
            );
        } catch (\Exception $e) {
            report($e);
            return response()->json(
                new ApiResponse(500, "Server error"),
                500
            );
        }
    }

    /**
     * Delete a task
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request): JsonResponse
    {
        try {
            $task = Task::query()->where('id', $request->id)->first();

            if (!$task) {
                return response()->json(
                    new ApiResponse(404, "Task not found"),
                    404
                );
            }

            $task->delete();

            return response()->json(
                new ApiResponse(200, ""),
                200
            );
        } catch (\Exception $e) {
            report($e);
            return response()->json(
                new ApiResponse(500, "Server error"),
                500
            );
        }
    }
}
