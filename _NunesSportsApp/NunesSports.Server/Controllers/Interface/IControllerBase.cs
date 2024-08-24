using Microsoft.AspNetCore.Mvc;

namespace NunesSports.Server.Controllers.Interface
{
    public interface IControllerBase<T> where T : class
    {
        Task<ActionResult<IEnumerable<T>>> GetAll();
        Task<ActionResult<T>> GetById(int id);
        Task<ActionResult<T>> Create(T entity);
        Task<IActionResult> Update(int id, T entity);
        Task<IActionResult> Delete(int id);
    }
}
