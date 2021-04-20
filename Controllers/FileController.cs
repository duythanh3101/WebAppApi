using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppApi.Service.Interfaces;
using WebAppApi.Service.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        // GET: api/<FileController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var files = await _fileService.GetAll();
            return Ok(files);
        }

        // GET api/<FileController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var file = await _fileService.GetById(id);
            return Ok(file);
        }

        // POST api/<FileController>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatedFileViewModel file)
        {
            var fileId = _fileService.Create(file);
            if (fileId == 0)
                return BadRequest();

            var newFile = await _fileService.Get(fileId);
            return CreatedAtAction(nameof(Create), new { id = fileId }, newFile);
        }

        // PUT api/<FileController>/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdatedFileViewModel request)
        {
            _fileService.Update(request);
            return Ok();
        }

        // DELETE api/<FileController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _fileService.Remove(id);
            return Ok();
        }
    }
}
