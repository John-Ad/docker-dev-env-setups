using back_end.Data;
using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services;

public class AuthService
{
    private readonly ApplicationDBContext _context;

    public AuthService(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<Result> Register(User user)
    {
        var result = new Result();
        try
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                result.statusCode = 400;
                result.message = "User already exists";
                return result;
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.EmailConfirmationToken = Guid.NewGuid().ToString();
            user.EmailConfirmed = false;
            user.RefreshToken = Guid.NewGuid().ToString();

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            result.statusCode = 201;
            result.message = "User created successfully";
            result.data = user;
            return result;
        }
        catch (Exception e)
        {
            result.statusCode = 500;
            result.message = e.Message;
            return result;
        }
    }

    public async Task<Result> CreateUser(User user)
    {
        try
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return new Result
                {
                    statusCode = 400,
                    message = "User already exists",
                    data = ""
                };
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.EmailConfirmationToken = Guid.NewGuid().ToString();
            user.EmailConfirmed = true;
            user.RefreshToken = "";

            var created = await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new Result
            {
                statusCode = 201,
                message = "User created successfully",
                data = created
            };
        }
        catch (Exception e)
        {
            return new Result
            {
                statusCode = 500,
                message = e.Message,
                data = ""
            };
        }
    }
}