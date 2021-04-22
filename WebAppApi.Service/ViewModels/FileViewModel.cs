using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppApi.Data.Entities;

namespace WebAppApi.Service.ViewModels
{
    public class FileViewModel : BaseEntity<int>
    {
        public string Name { get; set; }

        public string Type { get; set; }

        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }

        public int ParentId { get; set; }

        public FileViewModel()
        {

        }

        public FileViewModel(int id, string name, string type, DateTime modified, string modifiedBy, int parentId)
        {
            Id = id;
            Name = name;
            Type = type;
            Modified = modified;
            ModifiedBy = modifiedBy;
            CreateAt = DateTime.Now;
            CreateBy = string.Empty;
            ParentId = parentId;
        }
    }
}
