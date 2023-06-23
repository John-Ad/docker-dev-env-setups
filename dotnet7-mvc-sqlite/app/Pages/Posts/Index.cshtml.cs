using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using app.Data;
using app.Models;
using Microsoft.AspNetCore.Authorization;

namespace app.Pages.Posts;

[Authorize(Roles = "User")]
public class IndexModel : PageModel
{
    private readonly app.Data.ApplicationDbContext _context;

    public IndexModel(app.Data.ApplicationDbContext context)
    {
        _context = context;
    }

    public IList<Post> Post { get; set; } = default!;

    public async Task OnGetAsync()
    {
        if (_context.Post != null)
        {
            Post = await _context.Post.ToListAsync();
        }
    }
}
