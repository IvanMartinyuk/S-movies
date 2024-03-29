﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Context
{
    public class FilmContext : DbContext
    {
        public DbSet<Film> Films { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Director> Directors { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Writer> Writers { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Selection> Selections { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Screenshot> Screenshots { get; set; }
        public FilmContext(DbContextOptions<FilmContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Selection>()
                .HasMany(x => x.Films)
                .WithMany(y => y.Selections);
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Login)
                .IsUnique();
            base.OnModelCreating(modelBuilder);
        }
    }
}
