using Microsoft.AspNetCore.Mvc;
using NunesSports.Models;
using NunesSports.Data;
using NunesSports.Controllers.Abstraction;

namespace NunesSports.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : AbsController<Produto>
    {
        public ProdutosController(DataContext context) : base(context)
        {
        }
    }
}