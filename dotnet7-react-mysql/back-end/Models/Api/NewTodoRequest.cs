namespace back_end.Models;

public class NewTodoRequest
{
    public int userId { get; set; }
    public String name { get; set; }
    public String description { get; set; }
}