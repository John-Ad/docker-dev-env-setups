
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Net;
using Xunit;
using Xunit.Abstractions;
using Microsoft.Extensions.Configuration;
using back_end.Utilities;
using back_end.Models;

namespace back_end_tests;

[Collection("GROUP_1")]
public class AdminTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly HttpClient client;
    private readonly ITestOutputHelper _testOutputHelper;
    private readonly IConfiguration config;
    private string adminToken;
    private string parentToken;
    private string staffToken;
    private string invalidToken;

    public AdminTests(CustomWebApplicationFactory<Program> factory, ITestOutputHelper testOutputHelper)
    {
        client = factory.CreateDefaultClient();
        client.Timeout = TimeSpan.FromSeconds(600);
        _testOutputHelper = testOutputHelper;

        IConfigurationBuilder builder = new ConfigurationBuilder();
        builder.AddJsonFile("appsettings.Development.json", false, true);
        config = builder.Build();

        JwtHandler jwtHandler = new JwtHandler(config);
        adminToken = jwtHandler.generate(4, 1);
        parentToken = jwtHandler.generate(2, 2);
        staffToken = jwtHandler.generate(3, 3);
        invalidToken = jwtHandler.generate(10000000, 1);
    }

    //---   GET PARENT REGISTRATION REQUESTS VALID  ---
    [Fact]
    public async Task GetParentRegistrationRequestsValid()
    {
        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", adminToken);
        var response = await client.GetAsync("api/admin/parent/registration/all");

        Assert.True(response.IsSuccessStatusCode);
    }

    //---   GET PARENT REGISTRATION REQUESTS INVALID, NOT AN ADMIN TOKEN  ---
    [Fact]
    public async Task GetParentRegistrationRequestsInvalid_NotAnAdminToken()
    {
        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", parentToken);
        var response = await client.GetAsync("api/admin/parent/registration/all");

        Assert.False(response.IsSuccessStatusCode);
        Assert.True(response.StatusCode == HttpStatusCode.Forbidden);
    }


}
