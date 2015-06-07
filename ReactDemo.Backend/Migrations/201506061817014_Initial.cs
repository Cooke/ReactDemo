namespace ReactDemo.Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Consultants",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ConsultantSkills",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Consultant_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Consultants", t => t.Consultant_Id)
                .Index(t => t.Consultant_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ConsultantSkills", "Consultant_Id", "dbo.Consultants");
            DropIndex("dbo.ConsultantSkills", new[] { "Consultant_Id" });
            DropTable("dbo.ConsultantSkills");
            DropTable("dbo.Consultants");
        }
    }
}
