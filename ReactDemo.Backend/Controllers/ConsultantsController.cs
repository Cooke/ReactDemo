using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using ReactDemo.Backend.DataContracts;
using ReactDemo.Backend.Models;

namespace ReactDemo.Backend.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ConsultantsController : ApiController
    {
        private readonly ModelContext _context = new ModelContext();

        // GET: api/Entities
        public IQueryable<ConsultantDataContract> GetConsultants(string query = null)
        {
            IQueryable<Consultant> consultants = _context.Consultants;

            if (query != null)
            {
                consultants = consultants.Where(x => x.Skills.Any(y => y.Name.Equals(query, StringComparison.InvariantCultureIgnoreCase)));
            }

            return
                consultants.Select(
                    x => new ConsultantDataContract { Name = x.Name, Skills = x.Skills.Select(y => y.Name).ToList() });
        }

        // PUT: api/Entities/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PostConsultant(ConsultantDataContract consultantContract)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dbConsultant = await CreateOrFetchDbConsultant(consultantContract.Name);

            var skillsToAdd = consultantContract.Skills.Except(dbConsultant.Skills.Select(x => x.Name)).ToArray();
            foreach (var skillToAdd in skillsToAdd)
            {
                dbConsultant.Skills.Add(new ConsultantSkill { Name = skillToAdd });
            }

            await _context.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            base.Dispose(disposing);
        }

        private async Task<Consultant> CreateOrFetchDbConsultant(string name)
        {
            var dbConsultant = await _context.Consultants.FirstOrDefaultAsync(x => x.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase));
            if (dbConsultant == null)
            {
                dbConsultant = new Consultant
                {
                    Skills = new List<ConsultantSkill>(),
                    Name = name
                };
                _context.Consultants.Add(dbConsultant);
            }

            return dbConsultant;
        }
    }
}