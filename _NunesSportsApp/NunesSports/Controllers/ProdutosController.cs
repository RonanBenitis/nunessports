using Microsoft.AspNetCore.Mvc;
using NunesSports.Models;
using NunesSports.Data;
using NunesSports.Controllers.Abstraction;
using System.Globalization;

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
            produto.Codigo = produto.Nome.ToUpper(CultureInfo.InvariantCulture);
            produto.Nome = produto.Nome.ToUpper(CultureInfo.InvariantCulture);
            produto.Descricao = produto.Descricao.ToUpper(CultureInfo.InvariantCulture);

            return await base.Update(id, produto);
        }

        public override async Task<ActionResult<Produto>> Create(Produto produto)
        {
            produto.Codigo = produto.Nome.ToUpper(CultureInfo.InvariantCulture);
            produto.Nome = produto.Nome.ToUpper(CultureInfo.InvariantCulture);
            produto.Descricao = produto.Descricao.ToUpper(CultureInfo.InvariantCulture);

            return await base.Create(produto);
        }
    }
}