using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using ReactDemo.Backend.Migrations;
using ReactDemo.Backend.Models;

namespace ReactDemo.Backend
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ModelContext,Configuration>());
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
