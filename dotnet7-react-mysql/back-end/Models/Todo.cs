using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.Models;

public class Todo
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public String Name { get; set; }

    [Required]
    public String Description { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }

    [Required]
    public DateTime UpdatedAt { get; set; }

    [Required]
    public bool IsComplete { get; set; }

    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
}
