using Microsoft.AspNetCore.Mvc;
using NunesSports.Server.Models;
using NunesSports.Server.Services.Interfaces;

namespace NunesSports.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : AbsControllerBase<Produto>
    {
        public ProdutoController(ICrudService<Produto> crudService) : base(crudService)
        {
        }
    }
}
