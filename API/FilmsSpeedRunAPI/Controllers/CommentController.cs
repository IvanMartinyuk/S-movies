using BLL.DTO;
using BLL.Services;
using DAL.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FilmsSpeedRunAPI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    [EnableCors("AllowOrigin")]
    public class CommentController : Controller
    {
        CommentService service;
        FilmContext context;
        public CommentController(FilmContext context)
        {
            this.context = context;
            service = new CommentService(context);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody]CommentDTO comment, int comToId = 0)
        {
            if (comment == null)
                return BadRequest(new { error = "bad data" });
            comment.AuthorId = context.Users.FirstOrDefault(x => x.Login == this.User.Identity.Name).Id;
            if (comToId != 0)
                await service.AddAsync(comment, comToId);
            else
                await service.AddAsync(comment);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            if (id == null || id == 0)
                return BadRequest(new { error = "bad id" });
            return Json(await service.Get(id));
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]CommentDTO comment)
        {
            if (comment == null)
                return BadRequest(new { error = "bad request" });
            await service.UpdateAsync(comment);
            return Ok();
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == null || id == 0)
                return BadRequest(new { error = "bad id" });
            await service.RemoveAsync(id);
            return Ok();
        }
    }
}
