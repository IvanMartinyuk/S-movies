using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmsSpeedRunAPI
{
    public class FillingData
    {
        public static void AddMainInfo(FilmContext context)
        {
            context.Roles.Add(new Role() { Name = "user" });
            context.Roles.Add(new Role() { Name = "admin" });
            context.SaveChanges();

            context.Users.Add(new User() { Login = "admin", PasswordHash = "a15bbc069bb0af781273e9d4021ec83c", RoleId = 2 });
        }
    }
}
