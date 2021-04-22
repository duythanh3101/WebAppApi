using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppApi.Common.Utils;
using WebAppApi.Data.Entities;
using WebAppApi.Data.Repository;
using WebAppApi.Data.UnitOfWork;
using WebAppApi.Service.Interfaces;
using WebAppApi.Service.ViewModels;

namespace WebAppApi.Service.Implementations
{
    public class FileService : IFileService
    {

        private readonly IAsyncRepository<File, int> _fileRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FileService(IAsyncRepository<File, int> fileRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _fileRepository = fileRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<FileViewModel>> GetAll()
        {
            var result = await _fileRepository.GetAsync();

            var a = result.Item1.ToList().Select(x => _mapper.Map<File, FileViewModel>(x)).ToList();
            //var a = _mapper.Map<IQueryable<File>, IQueryable<FileViewModel>>(result.Item1);
            return a;
        }

        public async Task<List<FileViewModel>> Get(int parentId)
        {
            var result = await _fileRepository.QueryAsync(x => x.ParentId == parentId);

            var a = result.Item1.ToList().Select(x => _mapper.Map<File, FileViewModel>(x)).ToList();
            //var a = _mapper.Map<IQueryable<File>, IQueryable<FileViewModel>>(result.Item1);
            return a;
        }


        public void Remove(int id)
        {
            _fileRepository.Delete(id);
            _unitOfWork.Commit();
        }

        public void Update(UpdatedFileViewModel file)
        {
            var updatedFile = _mapper.Map<UpdatedFileViewModel, File>(file);
            _fileRepository.Update(updatedFile);
            _unitOfWork.Commit();
        }

        public int Create(CreatedFileViewModel file)
        {
            var newFile = _mapper.Map<CreatedFileViewModel, File>(file);
            var result = _fileRepository.Add(newFile);
            _unitOfWork.Commit();
            return result.Id;
        }

        public async Task<FileViewModel> GetById(int id)
        {
            var result = await _fileRepository.GetByIdAsync(id);
            return _mapper.Map<File, FileViewModel>(result);
        }
    }
}
