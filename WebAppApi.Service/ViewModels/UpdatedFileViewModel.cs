using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppApi.Data.Entities;

namespace WebAppApi.Service.ViewModels
{
    public class UpdatedFileViewModel: BaseEntity<int>
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime Modified { get; set; } = DateTime.Now;
        public int ParentId { get; set; }
    }
}
