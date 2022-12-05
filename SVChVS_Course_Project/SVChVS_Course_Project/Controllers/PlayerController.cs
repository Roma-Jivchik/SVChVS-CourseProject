using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SVChVS_Course_Project.Services.PlayersServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Controllers
{
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;

        public PlayerController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpGet]
        [Route("[controller]/get-all")]
        [ProducesResponseType(typeof(List<Player>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var players = await _playerService.GetAllAsync();

                return Ok(players);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(Player), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] Player playerForCreate)
        {
            try
            {
                if (playerForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _playerService.Create(playerForCreate);

                return Ok(playerForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(Player), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] Player playerForUpdate)
        {
            try
            {
                if (playerForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _playerService.Update(playerForUpdate);

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
                await _playerService.Remove(ID);

                return Ok(ID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-last-name")]
        [ProducesResponseType(typeof(List<Player>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByLastNameAsync(string lastName)
        {
            try
            {
                var players = await _playerService.GetByLastNameAsync(lastName);

                if (players is null)
                {
                    return NotFound();
                }

                return Ok(players);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-team")]
        [ProducesResponseType(typeof(List<Player>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByTeamAsync(string team)
        {
            try
            {
                var players = await _playerService.GetByTeamAsync(team);

                if (players is null)
                {
                    return NotFound();
                }

                return Ok(players);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-position")]
        [ProducesResponseType(typeof(List<Player>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByPositionAsync(string position)
        {
            try
            {
                var players = await _playerService.GetByPositionAsync(position);

                if (players is null)
                {
                    return NotFound();
                }

                return Ok(players);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
