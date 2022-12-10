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
                return BadRequest(new { error = "no film id" });
            await service.RemoveAsync(filmId);
            return Ok();
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] FilmDTO film)
        {
            if (film == null)
                return BadRequest(new { error = "no film" });
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
        public async Task<IActionResult> GetPage(int page)
        {
            if (page == null || page < 0)
                return BadRequest(new { error = "invalid page" });
            return Json(service.GetSortedPage(new FilterOptions() { Page = page }));
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
        public async Task<IActionResult> Screenshots(int filmId)
        {
            if (filmId == null || filmId == 0)
                return BadRequest(new { error = "no film id" });
            var all = service.GetScreenshots(filmId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
        [HttpGet]
        public async Task<IActionResult> Actors(int filmId)
        {
            if (filmId == null || filmId == 0)
                return BadRequest(new { error = "no film id" });
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
        public async Task<IActionResult> Writers(int filmId)
        {
            if (filmId == null || filmId == 0)
                return BadRequest(new { error = "no film id" });
            var all = service.GetWriters(filmId);
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
        [HttpPost]
        public async Task<IActionResult> GetByFilter([FromBody]FilterOptions options)
        {
            return Json(service.GetSortedPage(options));
        }
        [HttpGet]
        public async Task<IActionResult> GetFilmsCount()
        {
            return Json(new { count = service.GetCount() });
        }
        [HttpGet]
        public async Task<IActionResult> Search(string search)
        {
            return Json(service.Search(search));
        }
        [HttpGet]
        public async Task<IActionResult> GetPageCount() => Json(service.GetPageCount());
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Vote(double vote, int filmId)
        {
            service.Vote(vote, filmId);
            return Ok();
        }
    }
}
