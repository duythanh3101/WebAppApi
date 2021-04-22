using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace WebAppApi.Data.Repository
{
    /// <summary>
    ///  Repository Pattern
    /// </summary>
    /// <typeparam name="T">entity class</typeparam>
    /// <typeparam name="K">type of key</typeparam>
    public interface IAsyncRepository<T, K> where T : class
    {
        /// <summary>
        /// Get an entity by its id.
        /// </summary>
        /// <param name="id">Id.</param>
        Task<T> GetByIdAsync(K id);

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
        Task<Tuple<IQueryable<T>, int>> GetAsync(
            int skip = 0,
            int take = 50,
            params Expression<Func<T, object>>[] includeProperties
        );

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
        Task<Tuple<IQueryable<T>, int>> QueryAsync(
            Expression<Func<T, bool>> predicate,
            int skip = 0,
            int take = 50,
            params Expression<Func<T, object>>[] includeProperties
        );

        /// <summary>
        /// Count number of entities.
        /// </summary>
        Task<int> CountAsync();

        /// <summary>
        /// Add new entity into database.
        /// </summary>
        /// <param name="entity">Entity.</param>
        /// <returns>Added entity.</returns>
        T Add(T entity);

        /// <summary>
        /// Update an existing entity.
        /// </summary>
        /// <param name="entity">New entity to override.</param>
        /// <returns>Update successfully or not.</returns>
        void Update(T entity);

        /// <summary>
        /// Delete an existing entity.
        /// </summary>
        /// <param name="entity">Target entity to delete.</param>
        /// <returns>Delete successfully or not.</returns>
        void Delete(T entity);

        /// <summary>
        /// Delete an existing entity.
        /// </summary>
        /// <param name="id">Id of entity</param>
        /// <returns>Delete successfully or not.</returns>
        Task Delete(K id);
    }
}
