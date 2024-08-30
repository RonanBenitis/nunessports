using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NunesSports.Controllers.Interface;
using NunesSports.Models;
using NunesSports.Models.Interface;

namespace NunesSports.Controllers.Abstraction
{
    public class AbsController<T> : ControllerBase, IController<T> where T : class, IId
    {
        protected readonly DbContext _context;
        protected readonly DbSet<T> _dbSet;

        public AbsController(DbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        // GET: api/[controller]
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<T>>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        // GET: api/[controller]/5
        [HttpGet("{id}")]
        public async Task<ActionResult<T>> GetById(int id)
        {
            var entity = await _dbSet.FindAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            return entity;
        }

        // PUT: api/[controller]/5
        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Update(int id, T entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/[controller]
        [HttpPost]
        public virtual async Task<ActionResult<T>> Create(T entity)
        {
            try
            {
                _dbSet.Add(entity);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
            }
            catch(DbUpdateException ex)
            {
                // Verifica se a exceção é do tipo SqliteException e inicializa SqliteException
                if (ex.InnerException is SqliteException sqliteException)
                {
                    if (sqliteException.SqliteErrorCode == 19)
                    {
                        var message = sqliteException.Message;

                        // Tenta extrair o nome do campo da mensagem de erro
                        string fieldName = "unknown field";
                        string tableName = "unknown table";
                        // Caputando tabela e campo
                        var match = Regex.Match(message, @"UNIQUE constraint failed: (\w+)\.(\w+)");

                        if (match.Success)
                        {
                            tableName = match.Groups[1].Value;
                            fieldName = match.Groups[2].Value;
                        }

                        return BadRequest(new
                        {
                            message = $"O valor do campo '{fieldName}' é UNIQUE e já foi cadastrado.",
                            table = tableName,
                            field = fieldName
                        });
                    }
                }
                return StatusCode(500, new { message = "Erro ao processar a solicitação " });
            }
        }

        // DELETE: api/[controller]/5
        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EntityExists(int id)
        {
            return _dbSet.Any(e => e.Id == id);
        }
    }
}
