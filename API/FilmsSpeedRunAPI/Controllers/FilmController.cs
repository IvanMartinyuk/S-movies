using BLL.DTO;
using BLL.Services;
using DAL.Context;
using Microsoft.AspNetCore.Authorization;
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
    public class FilmController : Controller
    {
        FilmService service;
        public FilmController(FilmContext context)
        {
            service = new FilmService(context);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] FilmDTO film)
        {
            if (film == null)
                return BadRequest(new { error = "no film" });
            await service.AddAsync(film);
            return Ok();
        }
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete(int filmId)
        {
            if (filmId == null || filmId == 0)
                return BadRequest(new { error = "no actor id" });
            await service.RemoveAsync(filmId);
            return Ok();
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] FilmDTO film)
        {
            if (film == null)
                return BadRequest(new { error = "no actor" });
            await service.UpdateAsync(film);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Get(int filmId)
        {
            if (filmId == null || filmId == 0)
                return BadRequest(new { error = "no actor id" });
            return Json(await service.Get(filmId));
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
        public async Task<IActionResult> Actors(int filmId)
        {
            if (filmId == null || filmId == 0)
                return BadRequest(new { error = "no actor id" });
            var all = service.GetActors(filmId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
        [HttpGet]
        public async Task<IActionResult> Genres(int filmId)
        {
            if (filmId == null || filmId == 0)
                return BadRequest(new { error = "no film id" });
            var all = service.GetGenres(filmId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
        [HttpGet]
        public async Task<IActionResult> Producers(int filmId)
        {
            if (filmId == null || filmId == 0)
                return BadRequest(new { error = "no film id" });
            var all = service.GetProducers(filmId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
        [HttpGet]
        public async Task<IActionResult> Directors(int filmId)
        {
            if (filmId == null || filmId == 0)
                return BadRequest(new { error = "no film id" });
            var all = service.GetDirectors(filmId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
        [HttpGet]
        public async Task<IActionResult> Selections(int filmId)
        {
            if (filmId == null || filmId == 0)
                return BadRequest(new { error = "no film id" });
            var all = service.GetSelections(filmId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
        [HttpGet]
        public async Task<IActionResult> Company(int filmId)
        {
            if (filmId == null || filmId == 0)
                return BadRequest(new { error = "no film id" });
            var all = service.GetCompany(filmId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
        [HttpGet]
        public async Task<IActionResult> GetBy(int page, string prop = "base")
        {
            return Json(service.GetSortedPage(prop, page));
        }
        [HttpPost]
        public async Task<IActionResult> GetByFilter([FromBody]FilterOptions options)
        {
            service.GetSortedPage(options.Prop, options.Page);
            return Json(service.SortedFilter(options));
        }
    }
}
