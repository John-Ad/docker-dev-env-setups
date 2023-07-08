using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using App.Data;
using App.Models;

namespace App.Pages.Employees
{
    public class IndexModel : PageModel
    {
        private readonly App.Data.ApplicationDbContext _context;

        public IndexModel(App.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Employee> employees { get; set; } = default!;
        public Store? store { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id is null)
            {
                return NotFound();
            }

            if (_context.Employee != null)
            {
                employees = await _context.Employee
                .Where(e => e.StoreId == id)
                .Include(e => e.Store).ToListAsync();

                store = await _context.Store.FirstOrDefaultAsync(m => m.Id == id);
                if (store == null)
                {
                    return NotFound();
                }
            }

            return Page();
        }
    }
}
