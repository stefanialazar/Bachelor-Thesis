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
    public class CartRepository : ICartRepository
    {
        private readonly SeriesSyncContext _context;
        public CartRepository(SeriesSyncContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Carts>> GetCartsByUserId(Guid userId)
        {
            return await _context.Carts.Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task<Carts> AddMerchToCart(Guid userId, string newMerch)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return null;
            }

            cart.Merch = cart.Merch.Length > 0 ? $"{cart.Merch}, {newMerch}" : newMerch;

            await _context.SaveChangesAsync();

            return cart;
        }

        public async Task<Carts> AddCart(Carts cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
            return cart;
        }

        public async Task<Carts> UpdateCart(Guid userId, string updatedCartContent)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                return null;
            }

            cart.Merch = updatedCartContent;
            await _context.SaveChangesAsync();

            return cart;
        }


    }
}
