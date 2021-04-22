using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppApi.Data.Entities;
using WebAppApi.Service.ViewModels;

namespace WebAppApi.Service.Interfaces
{
    public interface IFileService
    {
        Task<List<FileViewModel>> GetAll();
        Task<List<FileViewModel>> Get(int parentId);

        Task<FileViewModel> GetById(int id);

        void Update(UpdatedFileViewModel file);

        void Remove(int id);

        int Create(CreatedFileViewModel file);
    }
}
