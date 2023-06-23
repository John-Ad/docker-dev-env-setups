using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using App.Data;
using App.Models;
using Microsoft.AspNetCore.Authorization;

namespace App.Pages.Posts;

[Authorize(Roles = "User")]
public class CreateModel : PageModel
{
    private readonly App.Data.ApplicationDbContext _context;

    public CreateModel(App.Data.ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult OnGet()
    {
        return Page();
    }

    [BindProperty]
    public InputPost inputPost { get; set; } = default!;


    public class InputPost
    {
        public string UserId { get; set; } = default!;
        public string Title { get; set; } = default!;
        public string Content { get; set; } = default!;
    }

    // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
    public async Task<IActionResult> OnPostAsync()
    {
        Console.WriteLine("Post: " + inputPost.UserId);

        if (!ModelState.IsValid || _context.Post == null || inputPost == null)
        {
            // check which model property is invalid
            if (!ModelState.IsValid)
            {
                foreach (var modelStateKey in ModelState.Keys)
                {
                    var modelStateVal = ModelState[modelStateKey];
                    if (modelStateVal?.Errors.Count > 0)
                    {
                        foreach (var modelError in modelStateVal.Errors)
                        {
                            ModelState.AddModelError(string.Empty, modelError.ErrorMessage);
                        }
                    }
                }
            }

            return Page();
        }

        _context.Post.Add(new Post
        {
            UserId = inputPost.UserId,
            Title = inputPost.Title,
            Content = inputPost.Content,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        });
        await _context.SaveChangesAsync();

        return RedirectToPage("./Index");
    }
}
