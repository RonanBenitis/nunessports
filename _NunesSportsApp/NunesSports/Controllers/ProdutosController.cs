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

        public override async Task<IActionResult> Update(int id, Produto produto)
        {
            produto.Codigo = produto.Nome.ToUpper();
            produto.Nome = produto.Nome.ToUpper();
            produto.Descricao = produto.Descricao.ToUpper();

            return await base.Update(id, produto);
        }

        public override async Task<ActionResult<Produto>> Create(Produto produto)
        {
            produto.Codigo = produto.Nome.ToUpper();
            produto.Nome = produto.Nome.ToUpper();
            produto.Descricao = produto.Descricao.ToUpper();

            return await base.Create(produto);
        }
    }
}