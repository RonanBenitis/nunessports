using Microsoft.AspNetCore.Mvc;
using NunesSports.Server.Controllers.Interface;
using NunesSports.Server.Services.Interfaces;
using NunesSports.Server.Models.Interface;

namespace NunesSports.Server.Controllers
{
    public abstract class AbsControllerBase<T> : ControllerBase, IControllerBase<T> where T : class, IId
    {
        private readonly ICrudService<T> _crudService;

        protected AbsControllerBase(ICrudService<T> crudService)
        {
            _crudService = crudService;
        }

        [HttpPost]
        public virtual async Task<ActionResult<T>> Create(T entity)
        {
            await _crudService.CreateAsync(entity);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(int id)
        {
            var success = await _crudService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<T>>> GetAll()
        {
            var entities = await _crudService.GetAllAsync();
            return Ok(entities);
        }

        [HttpGet("{id}")]
        public virtual async Task<ActionResult<T>> GetById(int id)
        {
            var entity = await _crudService.GetByIdAsync(id);
            if (entity == null) return NotFound();
            return Ok(entity);
        }

        public virtual async Task<IActionResult> Update(int id, T entity)
        {
            if (id != entity.Id) return BadRequest();
            await _crudService.UpdateAsync(entity);
            return NoContent();
        }
    }
}
