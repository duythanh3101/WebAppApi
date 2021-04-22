using AutoMapper;
using WebAppApi.Data.Entities;
using WebAppApi.Service.ViewModels;


namespace WebAppApi.Service.AutoMapper
{
    public class ViewModelToDomainAutoMapper : Profile
    {
        public ViewModelToDomainAutoMapper()
        {
            CreateMap<CreatedFileViewModel, File>();
            CreateMap<UpdatedFileViewModel, File>();



        }
    }
}
