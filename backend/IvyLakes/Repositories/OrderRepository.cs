using IvyLakes.Data;
using IvyLakes.IRepositories;
using IvyLakes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Helpers;
using Microsoft.EntityFrameworkCore;

namespace IvyLakes.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly SeriesSyncContext _context;
        public OrderRepository(SeriesSyncContext context)
        {
            _context = context;
        }
        public async Task<Orders> AddOrder(Guid userId, string newMerch, DateTime orderDate)
        {
            int maxOrderID = await _context.Orders.MaxAsync(o => o.OrderId);

            var newOrder = new Orders
            {
                OrderId = maxOrderID + 1,
                UserId = userId,
                Merch = newMerch,
                OrderDate = orderDate,
            };

            _context.Orders.Add(newOrder);

            await _context.SaveChangesAsync();

            return newOrder;
        }



    }
}
