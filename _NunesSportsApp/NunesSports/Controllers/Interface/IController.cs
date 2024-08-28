﻿using Microsoft.AspNetCore.Mvc;

namespace NunesSports.Controllers.Interface
{
    public interface IController<T> where T : class
    {
        Task<ActionResult<IEnumerable<T>>> GetAll();
        Task<ActionResult<T>> GetById(int id);
        Task<IActionResult> Update(int id, T entity);
        Task<ActionResult<T>> Create(T entity);
        Task<IActionResult> Delete(int id);
    }
}
