<?php

$status = "error";

$message = match ($status) {
    "success" => "Operation succeeded",
    "error" => "Operation failed",
    default => "Unknown status"
};

echo $message;

echo "<br>";



/**
 * A simple user class
 *
 * @property string $name
 * @property int $age
 */
class User
{
    public string $name = "John Doe";
    public int $age = 30;

    // constructor
    public function __construct(string $name, int $age)
    {
        $this->name = $name;
        $this->age  = $age;
    }

    // toString
    public function __toString(): string
    {
        return "User {$this->name} is {$this->age} years old";
    }
}

$user = new User("John Doe", 30);

$user->name = "Jane Doe";

// convert user to string
$userString = (string) $user;

echo $user;