using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services
{
    public interface IServiceBase<T> where T : class
    {
        Task<T> GetAsync(string ID);
        Task<List<T>> GetAllAsync();
        Task Remove(string ID);
        Task<T> Create(T entity);
        Task<T> Update(T entity);
    }
}
