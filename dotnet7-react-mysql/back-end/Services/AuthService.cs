using back_end.Data;
using back_end.Models;
using back_end.Utilities;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services;

public class AuthService
{
    private readonly ApplicationDBContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(ApplicationDBContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
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

    // create login method
    public async Task<Result> Login(User user)
    {
        var result = new Result
        {
            statusCode = 0,
            message = "",
            data = ""
        };
        try
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser == null)
            {
                result.statusCode = 404;
                result.message = "User does not exist";
                return result;
            }

            if (!BCrypt.Net.BCrypt.Verify(user.Password, existingUser.Password))
            {
                result.statusCode = 400;
                result.message = "Invalid credentials";
                return result;
            }

            if (!existingUser.EmailConfirmed)
            {
                result.statusCode = 400;
                result.message = "Please confirm your email";
                return result;
            }

            var jwtHandler = new JwtHandler(_configuration);
            var token = jwtHandler.generate(existingUser.Id, existingUser.RoleId);
            var refreshToken = jwtHandler.generateRefreshToken();

            existingUser.RefreshToken = refreshToken;
            _context.Users.Update(existingUser);
            await _context.SaveChangesAsync();

            result.statusCode = 200;
            result.message = "User logged in successfully";
            result.data = new LoginResponse
            {
                token = token,
                refreshToken = refreshToken
            };
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