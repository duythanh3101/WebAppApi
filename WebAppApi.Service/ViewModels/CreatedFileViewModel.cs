using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAppApi.Service.ViewModels
{
    public class CreatedFileViewModel
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Modified { get; set; }
        public string ModifiedBy { get; set; }
        public string CreateAt { get; set; }
        public string CreateBy { get; set; }

        public int ParentId { get; set; }
    }
}
