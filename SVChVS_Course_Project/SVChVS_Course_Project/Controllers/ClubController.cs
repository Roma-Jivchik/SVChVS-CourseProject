using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SVChVS_Course_Project.Models;
using SVChVS_Course_Project.Services.ClubServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Controllers
{
    [ApiController]
    public class ClubController : ControllerBase
    {
        private readonly IClubService _clubService;

        public ClubController(IClubService clubService)
        {
            _clubService = clubService;
        }

        [HttpGet]
        [Route("[controller]/get-all")]
        [ProducesResponseType(typeof(List<Club>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var clubs = await _clubService.GetAll();

                return Ok(clubs);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(Club), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] Club clubForCreate)
        {
            try
            {
                if (clubForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _clubService.Create(clubForCreate);

                return Ok(clubForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(Club), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] Club clubForUpdate)
        {
            try
            {
                if (clubForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _clubService.Update(clubForUpdate);

                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpDelete]
        [Route("[controller]/delete")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete([FromBody] string ID)
        {
            try
            {
                await _clubService.Delete(ID);

                return Ok(ID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/get-by-league")]
        [ProducesResponseType(typeof(List<Club>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByLeague([FromBody] string league)
        {
            try
            {
                var clubs = await _clubService.GetByLeagueAsync(league);

                if (clubs is null)
                {
                    return NotFound();
                }

                return Ok(clubs);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
