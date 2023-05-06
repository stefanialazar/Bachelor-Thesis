using IvyLakes.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.IRepositories
{
    public interface ICartRepository
    {
        Task<IEnumerable<Carts>> GetCartsByUserId(Guid userId);
        Task<Carts> AddMerchToCart(Guid userId, string newMerch);
        Task<Carts> AddCart(Carts cart);
        Task<Carts> UpdateCart(Guid userId, string updatedCartContent);
    }
}

