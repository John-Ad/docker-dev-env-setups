<?php

namespace App\Http\Controllers;

use App\Models\ApiResponse;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Get all tasks for a user
     * @param Request $request
     * @return JsonResponse
     */
    public function getAllForUser(Request $request): JsonResponse
    {
        try {
            $tasks = Task::query()->where('user_id', $request->userId)->get();

            return response()->json(
                new ApiResponse($tasks, ""),
                400
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
            $position = Task::query()->where('user_id', $request->userId)->max('position');

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
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        try {
            $task = Task::query()->where('id', $request->id)->first();

            if (!$task) {
                return response()->json(
                    new ApiResponse(404, "Task not found"),
                    404
                );
            }

            $task->title = $request->title ?? $task->title;
            $task->completed_at = $request->completedAt ?? $task->completed_at;
            $task->position = $request->position ?? $task->position;
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
