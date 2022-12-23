using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SVChVS_Course_Project.Models;
using SVChVS_Course_Project.Services.TransferListServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Controllers
{
    [ApiController]
    public class TransferListController : ControllerBase
    {
        private readonly ITransferListService _transferListService;

        public TransferListController(ITransferListService transferListService)
        {
            _transferListService = transferListService;
        }

        [HttpGet]
        [Route("[controller]/get-all")]
        [ProducesResponseType(typeof(List<TransferList>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var transferLists = await _transferListService.GetAll();

                return Ok(transferLists);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(TransferList), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] TransferList transferListForCreate)
        {
            try
            {
                if (transferListForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _transferListService.Create(transferListForCreate);

                return Ok(transferListForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(TransferList), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] TransferList transferListForUpdate)
        {
            try
            {
                if (transferListForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _transferListService.Update(transferListForUpdate);

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
                await _transferListService.Delete(ID);

                return Ok(ID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/get-by-team")]
        [ProducesResponseType(typeof(List<TransferList>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByTeamAsync([FromBody] string team)
        {
            try
            {
                var transferLists = await _transferListService.GetByTeamAsync(team);

                if (transferLists is null)
                {
                    return NotFound();
                }

                return Ok(transferLists);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
