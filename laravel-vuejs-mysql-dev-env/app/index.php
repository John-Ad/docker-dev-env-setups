<?php

$status = "error";

$message = match ($status) {
    "success" => "Operation succeeded",
    "error" => "Operation failed",
    default => "Unknown status"
};

echo $message;