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
public class IndexModel : PageModel
{
    private readonly App.Data.ApplicationDbContext _context;

    public IndexModel(App.Data.ApplicationDbContext context)
    {
        _context = context;
    }

    public IList<Post> Posts { get; set; } = default!;

    public async Task OnGetAsync()
    {
        if (_context.Post != null)
        {
            Posts = await _context.Post.ToListAsync();
            Console.WriteLine("updated" + Posts[2].UpdatedAt);
        }
    }
}
