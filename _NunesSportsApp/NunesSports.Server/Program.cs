using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using NunesSports.Server.Data;
using NunesSports.Server.Services;
using NunesSports.Server.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Adicionando ICrud e Crud no container de serviços
builder.Services.AddScoped(typeof(ICrudService<>), typeof(CrudService<>));

// Add services to the container.
builder.Services.AddControllers();

// Add DbContext to PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
