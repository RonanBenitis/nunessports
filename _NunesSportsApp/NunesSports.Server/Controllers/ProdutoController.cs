using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NunesSports.Server.Data;
using NunesSports.Server.Models;

namespace NunesSports.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProdutoController(AppDbContext context)
        {
            _context = context;
        }

        // Listando itens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
        {
            return await _context.Produtos.ToListAsync();
        }

        // Buscando item por id
        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> GetProdutoPorId(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);

            if (produto == null)
            {
                return NotFound();
            }

            return produto;
        }

        // Criando itens
        [HttpPost]
        public async Task<ActionResult<Produto>> PostProduto(Produto produto)
        {
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProdutoPorId), new { id = produto.Id }, produto);
        }
    }
}
