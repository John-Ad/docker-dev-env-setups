using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using app.Data;
using app.Models;
using Microsoft.AspNetCore.Authorization;

namespace app.Pages.Posts;

[Authorize(Roles = "User")]
public class CreateModel : PageModel
{
    private readonly app.Data.ApplicationDbContext _context;

    public CreateModel(app.Data.ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult OnGet()
    {
        return Page();
    }

    [BindProperty]
    public Post Post { get; set; } = default!;


    // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid || _context.Post == null || Post == null)
        {
            // display model errors in form




            return Page();
        }

        _context.Post.Add(Post);
        await _context.SaveChangesAsync();

        return RedirectToPage("./Index");
    }
}
