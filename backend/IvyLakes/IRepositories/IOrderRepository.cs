using IvyLakes.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.IRepositories
{
    public interface IOrderRepository
    {
        Task<Orders> AddOrder(Guid userId, string newMerch, DateTime orderDate);
    }
}
