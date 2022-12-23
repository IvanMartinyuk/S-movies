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
    public class WriterController : Controller
    {
        WriterService service;
        public WriterController(FilmContext context)
        {
            service = new WriterService(context);
        }
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Test(int i)
        {
            return Ok();
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] WriterDTO writer)
        {
            if (writer == null)
                return BadRequest(new { error = "no actor" });
            await service.AddAsync(writer);
            return Ok();
        }
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete(int writerId)
        {
            if (writerId == null || writerId == 0)
                return BadRequest(new { error = "no actor id" });
            await service.RemoveAsync(writerId);
            return Ok();
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] WriterDTO writer)
        {
            if (writer == null)
                return BadRequest(new { error = "no actor" });
            await service.UpdateAsync(writer);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Get(int writerId)
        {
            if (writerId == null || writerId == 0)
                return BadRequest(new { error = "no actor id" });
            return Json(await service.Get(writerId));
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
        public async Task<IActionResult> Films(int writerId)
        {
            if (writerId == null || writerId == 0)
                return BadRequest(new { error = "no actor id" });
            var all = service.GetFilms(writerId);
            if (all == null)
                return NotFound(new { error = "no data" });
            return Json(all);
        }
        [HttpGet]
        public async Task<IActionResult> Search(string name)
        {
            return Json(service.Search(name));
        }
    }
}
