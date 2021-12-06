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
    public class GenreController : Controller
    {
        GenreService service;
        public GenreController(FilmContext context)
        {
            service = new GenreService(context);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GenreDTO genre)
        {
            if (genre == null)
                return BadRequest(new { error = "no actor" });
            await service.AddAsync(genre);
            return Ok();
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int genreId)
        {
            if (genreId == null || genreId == 0)
                return BadRequest(new { error = "no actor id" });
            await service.RemoveAsync(genreId);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] GenreDTO genre)
        {
            if (genre == null)
                return BadRequest(new { error = "no actor" });
            await service.UpdateAsync(genre);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Get(int genreId)
        {
            if (genreId == null || genreId == 0)
                return BadRequest(new { error = "no actor id" });
            return Json(await service.Get(genreId));
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
        public async Task<IActionResult> Films(int genreId)
        {
            if (genreId == null || genreId == 0)
                return BadRequest(new { error = "no actor id" });
            var all = service.GetFilms(genreId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
    }
}
