using back_end.Models;
using back_end.Data;
using back_end.Utilities;
using Microsoft.EntityFrameworkCore;

namespace back_end_unit_tests.Helpers;

public class DB_Init
{
    public static void InitDbForTests(ApplicationDBContext dbContext)
    {
        // create default user types
        List<Role> roles = new List<Role>(){
            new Role{
                Id=(int)ROLES.ADMIN,
                Name="Admin",
                Description="Admin"
            },
            new Role{
                Id=(int)ROLES.USER,
                Name="User",
                Description="User"
            }
        };
        dbContext.Roles.AddRange(roles);
        dbContext.SaveChanges();

        List<User> users = new List<User>(){
            new User{
                Id=1,
                RoleId=(int)ROLES.ADMIN,
                Email="admin@admin.com",
                EmailConfirmed=true,
                Password="Admin@123",
                RefreshToken="",
            },
            new User{
                Id=2,
                RoleId=(int)ROLES.USER,
                Email="user@user.com",
                EmailConfirmed=true,
                Password="User@123",
                RefreshToken="",
            },
        };
        dbContext.Users.AddRange(users);
        dbContext.SaveChanges();

    }
}