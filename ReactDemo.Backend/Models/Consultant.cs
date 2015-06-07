using System.Collections.Generic;

namespace ReactDemo.Backend.Models
{
    public class Consultant
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual IList<ConsultantSkill> Skills { get; set; }
    }
}