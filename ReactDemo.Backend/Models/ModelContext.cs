using System;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ReactDemo.Backend.Models
{
    public class ModelContext : DbContext
    {
        public DbSet<Consultant> Consultants { get; set; }
    }
}