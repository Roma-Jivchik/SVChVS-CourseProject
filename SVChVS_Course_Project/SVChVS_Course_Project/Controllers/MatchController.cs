using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SVChVS_Course_Project.Services.MatchesServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Controllers
{
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly IMatchService _matchService;

        public MatchController(IMatchService matchService)
        {
            _matchService = matchService;
        }

        [HttpGet]
        [Route("[controller]/get-all")]
        [ProducesResponseType(typeof(List<Match>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var matchs = await _matchService.GetAllAsync();

                return Ok(matchs);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(Match), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] Match matchForCreate)
        {
            try
            {
                if (matchForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _matchService.Create(matchForCreate);

                return Ok(matchForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(Match), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] Match matchForUpdate)
        {
            try
            {
                if (matchForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _matchService.Update(matchForUpdate);

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
                await _matchService.Remove(ID);

                return Ok(ID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-result")]
        [ProducesResponseType(typeof(List<Match>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByResultAsync(string result)
        {
            try
            {
                var matchs = await _matchService.GetByResultAsync(result);

                if (matchs is null)
                {
                    return NotFound();
                }

                return Ok(matchs);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-team-played")]
        [ProducesResponseType(typeof(List<Match>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByTeamPlayed(string teamPlayed)
        {
            try
            {
                var matchs = await _matchService.GetByTeamPlayedAsync(teamPlayed);

                if (matchs is null)
                {
                    return NotFound();
                }

                return Ok(matchs);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
