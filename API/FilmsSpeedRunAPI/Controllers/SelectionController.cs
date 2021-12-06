using BLL.DTO;
using BLL.Services;
using DAL.Context;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmsSpeedRunAPI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    [EnableCors("AllowOrigin")]
    public class SelectionController : Controller
    {
        SelectionService service;
        public SelectionController(FilmContext context)
        {
            service = new SelectionService(context);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SelectionDTO selection)
        {
            if (selection == null)
                return BadRequest(new { error = "no actor" });
            await service.AddAsync(selection);
            return Ok();
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int selectionId)
        {
            if (selectionId == null || selectionId == 0)
                return BadRequest(new { error = "no actor id" });
            await service.RemoveAsync(selectionId);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] SelectionDTO selection)
        {
            if (selection == null)
                return BadRequest(new { error = "no actor" });
            await service.UpdateAsync(selection);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Get(int selectionId)
        {
            if (selectionId == null || selectionId == 0)
                return BadRequest(new { error = "no actor id" });
            return Json(await service.Get(selectionId));
        }
        [HttpGet]
        public async Task<IActionResult> All()
        {
            var all = service.GetAll();
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
        [HttpGet]
        public async Task<IActionResult> Films(int selectionId)
        {
            if (selectionId == null || selectionId == 0)
                return BadRequest(new { error = "no actor id" });
            var all = service.GetFilms(selectionId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
    }
}
