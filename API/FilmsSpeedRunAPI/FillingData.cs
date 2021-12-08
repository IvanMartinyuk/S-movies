using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmsSpeedRunAPI
{
    public class FillingData
    {
        public static void Fill(FilmContext context)
        {
            context.Roles.Add(new Role() { Name = "user" });
            context.Roles.Add(new Role() { Name = "admin" });
            context.SaveChanges();

            context.Users.Add(new User() { Login = "admin", PasswordHash = "2af9b1ba42dc5eb01743e6b3759b6e4b", RoleId = 2 });
            //List<Film> films = new List<Film>() { 
            //    new Film()
            //    {
            //        Title = ""
            //    }
            //};


            context.SaveChanges();
        }
    }
}
