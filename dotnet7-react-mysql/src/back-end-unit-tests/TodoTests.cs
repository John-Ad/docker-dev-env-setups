using back_end.Services;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
using Xunit.Abstractions;

namespace back_end_unit_tests;

public class TodoTests : BaseTest
{
    private readonly ITestOutputHelper _testOutputHelper;
    private ITodoService todoService;

    public TodoTests(ITestOutputHelper testOutputHelper)
    {
        this._testOutputHelper = testOutputHelper;
        this.todoService = new TodoService(this.dbContext);
    }


    #region Get

    /// <summary>
    ///     Test get all todos    
    /// </summary>
    /// <returns></returns>
    [Fact]
    public async Task getAllTodos()
    {
        var response = await todoService.GetAll();
        Assert.Equal("", response.message);
    }

    #endregion


}