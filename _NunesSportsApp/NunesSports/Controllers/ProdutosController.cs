using Microsoft.AspNetCore.Mvc;
using NunesSports.Models;
using NunesSports.Data;
using NunesSports.Controllers.Abstraction;
using System.Globalization;
using Microsoft.Build.Framework;

namespace NunesSports.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : AbsController<Produto>
    {
        public ProdutosController(DataContext context) : base(context)
        {
        }

        private string? notNullToUpper(string? input)
        {
            return string.IsNullOrEmpty(input) ? input : input.ToUpper(CultureInfo.InvariantCulture);
        }

        public override async Task<IActionResult> Update(int id, Produto produto)
        {
            produto.Codigo = produto.Codigo.ToUpper(CultureInfo.InvariantCulture);
            produto.Nome = produto.Nome.ToUpper(CultureInfo.InvariantCulture);
            produto.Descricao = notNullToUpper(produto.Descricao);

            return await base.Update(id, produto);
        }

        public override async Task<ActionResult<Produto>> Create(Produto produto)
        {
            produto.Codigo = produto.Codigo.ToUpper(CultureInfo.InvariantCulture);
            produto.Nome = produto.Nome.ToUpper(CultureInfo.InvariantCulture);
            produto.Descricao = notNullToUpper(produto.Descricao);

            return await base.Create(produto);
        }
    }
}