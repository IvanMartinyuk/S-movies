using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Context
{
    [Serializable]
    public class User
    {
        public int Id { get; set; }
        [Required]
        [StringLength(30)]
        public string Login { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Image { get; set; }
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
        public virtual List<Selection> Selections { get; set; }
    }
}
