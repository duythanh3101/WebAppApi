using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppApi.Data.EF;

namespace WebAppApi.Data.UnitOfWork
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private readonly FileDbContext _context;
        public EFUnitOfWork(FileDbContext context)
        {
            _context = context;
        }
        public void Commit()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
