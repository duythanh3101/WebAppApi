using AutoMapper;
using WebAppApi.Common.Utils;
using WebAppApi.Data.Entities;
using WebAppApi.Data.Enums;
using WebAppApi.Service.ViewModels;

namespace WebAppApi.Service.AutoMapper
{
    public class DomainToViewModelAutoMapper : Profile
    {
        public DomainToViewModelAutoMapper()
        {
            CreateMap<FileEnum, string>().ConvertUsing<EnumToStringConverter>();
            CreateMap<File, FileViewModel>();
           
        }
    }

    public class EnumToStringConverter : ITypeConverter<FileEnum, string>
    {
        public string Convert(FileEnum source, string destination, ResolutionContext context)
        {
            return source.GetStringFromEnum();
        }
    }
}
