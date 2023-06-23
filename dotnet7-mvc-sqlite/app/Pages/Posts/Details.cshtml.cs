using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using App.Data;
using App.Models;
using Microsoft.AspNetCore.Authorization;

namespace App.Pages.Posts;

[Authorize]
public class DetailsModel : PageModel
{
    private readonly App.Data.ApplicationDbContext _context;

    public DetailsModel(App.Data.ApplicationDbContext context)
    {
        _context = context;
    }

    public Post Post { get; set; } = default!;

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
        else
        {
            Post = post;
        }
        return Page();
    }
}
