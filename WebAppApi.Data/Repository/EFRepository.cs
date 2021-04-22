using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using WebAppApi.Data.EF;
using WebAppApi.Data.Entities;

namespace WebAppApi.Data.Repository
{
    public class EFRepository<T, K> : IAsyncRepository<T, K>, IDisposable where T : BaseEntity<K>
    {
        private readonly FileDbContext DataContext;

        protected virtual DbSet<T> DbSet { get => DataContext.Set<T>(); }

        public EFRepository(FileDbContext context)
        {
            DataContext = context;
        }

        /// <summary>
        /// Get an entity by its id.
        /// </summary>
        /// <param name="id">Id.</param>
        public virtual async Task<T> GetByIdAsync(K id)
        {
            return await DbSet.FindAsync(id);
        }

        /// <summary>
        /// Get entities with only skip, take, include properties.
        /// </summary>
        /// <param name="skip">Number of elements that will be skipped (default is 0).</param>
        /// <param name="take">Number of elements that will be taken (default is 50).</param>
        /// <param name="includeProperties">Navigation properties that should be included when loading data.</param>
        /// <returns>
        /// Return a tuple that contains pagination result.
        /// <para>- Item1: item list.</para>
        /// <para>- Item2: total values.</para>
        /// </returns>
        public virtual async Task<Tuple<IQueryable<T>, int>> GetAsync(
            int skip = 0,
            int take = 50,
            params Expression<Func<T, object>>[] includeProperties
        )
        {
            var values = DbSet.Skip(skip).Take(take);

            if (includeProperties != null && includeProperties.Length > 0)
                foreach (var includeProperty in includeProperties)
                    values = values.Include(includeProperty);

            values = values.OrderBy(e => e.Id);
            var totalValues = await CountAsync();

            return new Tuple<IQueryable<T>, int>(values, totalValues);
        }

        /// <summary>
        /// Query entities with filter, skip, take, include properties.
        /// </summary>
        /// <param name="predicate">Filter predicate.</param>
        /// <param name="skip">Number of elements that will be skipped (default is 0).</param>
        /// <param name="take">Number of elements that will be taken (default is 50).</param>
        /// <param name="includeProperties">Navigation properties that should be included when loading data.</param>
        /// <returns>
        /// Return a tuple that contains pagination result.
        /// <para>- Item1: item list.</para>
        /// <para>- Item2: total values.</para>
        /// </returns>
        public virtual async Task<Tuple<IQueryable<T>, int>> QueryAsync(
            Expression<Func<T, bool>> predicate,
            int skip = 0,
            int take = 50,
            params Expression<Func<T, object>>[] includeProperties
        )
        {
            if (predicate == null)
                return await GetAsync(skip, take, includeProperties);

            var where = DbSet.Where(predicate);
            var values = where.Skip(skip).Take(take);

            if (includeProperties != null && includeProperties.Length > 0)
                foreach (var includeProperty in includeProperties)
                    values = values.Include(includeProperty);

            values = values.OrderBy(e => e.Id);
            var totalValues = await where.CountAsync();

            return new Tuple<IQueryable<T>, int>(values, totalValues);
        }

        /// <summary>
        /// Count number of entities.
        /// </summary>
        public virtual async Task<int> CountAsync()
        {
            return await DbSet.CountAsync();
        }

        /// <summary>
        /// Add new entity into database.
        /// </summary>
        /// <param name="entity">Entity.</param>
        /// <returns>Added entity.</returns>
        public virtual T Add(T entity)
        {
            var result = DbSet.Add(entity);
            return result.Entity;
        }

        /// <summary>
        /// Update an existing entity.
        /// </summary>
        /// <param name="entity">New entity to override.</param>
        /// <returns>Update successfully or not.</returns>
        public virtual void Update(T entity)
        {
            DataContext.Entry(entity).State = EntityState.Modified;
        }

        /// <summary>
        /// Delete an existing entity.
        /// </summary>
        /// <param name="entity">Target entity to delete.</param>
        /// <returns>Delete successfully or not.</returns>
        public virtual void Delete(T entity)
        {
            DbSet.Remove(entity);
        }


        /// <summary>
        /// Delete an existing entity.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Delete successfully or not.</returns>
        public virtual async Task Delete(K id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                Delete(entity);
            }
        }   

        public void Dispose()
        {
            if (DataContext != null)
            {
                DataContext.Dispose();
            }
        }
    }
}
