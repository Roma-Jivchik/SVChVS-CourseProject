using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services
{
    public interface IServiceBase<T> where T : class
    {
        Task<T> Get(string ID);
        Task<List<T>> GetAll();
        Task<T> Create(T entity);
        Task<T> Update(T entity);
        Task Delete(string ID);
    }
}
