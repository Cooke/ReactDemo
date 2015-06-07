using System.Collections.Generic;

namespace ReactDemo.Backend.DataContracts
{
    public class ConsultantDataContract
    {
        public ConsultantDataContract()
        {
            Skills = new List<string>();
        }

        public string Name { get; set; }

        public List<string> Skills { get; set; }
    }
}