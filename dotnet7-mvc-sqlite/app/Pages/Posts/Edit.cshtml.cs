using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using App.Data;
using App.Models;
using Microsoft.AspNetCore.Authorization;

namespace App.Pages.Posts;
[Authorize(Roles = "User")]
public class EditModel : PageModel
{
    private readonly App.Data.ApplicationDbContext _context;

    public EditModel(App.Data.ApplicationDbContext context)
    {
        _context = context;
    }

    [BindProperty]
    public InputPost newPost { get; set; } = default!;

    public class InputPost
    {
        public int Id { get; set; }
        public string Title { get; set; } = default!;
        public string Content { get; set; } = default!;
    }

    public async Task<IActionResult> OnGetAsync(int? id)
    {
        if (id == null || _context.Post == null)
        {
            return NotFound();
        }

        var post = await _context.Post.FirstOrDefaultAsync(m => m.Id == id);
        if (post == null)
        {
            return NotFound();
        }
        newPost = new InputPost
        {
            Id = post.Id,
            Title = post.Title,
            Content = post.Content
        };
        return Page();
    }

    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see https://aka.ms/RazorPagesCRUD.
    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
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

        var originalPost = await _context.Post.FirstOrDefaultAsync(m => m.Id == newPost.Id);
        if (originalPost == null)
        {
            return NotFound();
        }

        if (originalPost.Title == newPost.Title && originalPost.Content == newPost.Content)
        {
            return RedirectToPage("./Index");
        }

        originalPost.Title = newPost.Title;
        originalPost.Content = newPost.Content;
        originalPost.UpdatedAt = DateTime.UtcNow;

        try
        {
            _context.Post.Update(originalPost);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PostExists(originalPost.Id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return RedirectToPage("./Index");
    }

    private bool PostExists(int id)
    {
        return (_context.Post?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
