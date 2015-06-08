using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ReactDemo.DocumentScanner
{
    class Program
    {
        private const string CvDocumentsRootPath = @"c:\temp\";

        private static readonly string[] KnownSkills = {
            "C#", "C", "C++", ".NET", "VB", "VB.NET", "ASP", "ASP.NET", "HTML", "CSS", "JavaScript", "VHDL", "HTML5",
            "TypeScript", "React", "Flux", "LTE", "GSM", "Matlab", "Assembler", "Java", "Python", "Visual Studio", "Atmel Studio 6", "MPLabX", "Eclipse", "Simulink", "LaTeX", "Git", "Subversion", "SVN", "Sourcetree", "Atmel ASF", "RTOS", "Embedded", "Linux", "Arduino",
            "Secure", "databasmodellering", "agila metoder", "Scrum", "Kanban", "Lean", "riskanalys", "SQL", "PL/SQL", "sqlite", "WPF", "NUnit", "Windows"

        };

        static void Main(string[] args)
        {
            using (var wordDocumentReader = new WordDocumentReader())
            {
                var cvFilePaths = Directory.EnumerateFiles(CvDocumentsRootPath, "*.doc", SearchOption.AllDirectories);
                foreach (var cvFilePath in cvFilePaths)
                {
                    try
                    {
                        ProcessWordDocument(cvFilePath, wordDocumentReader);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Failed to parse: {0}", cvFilePath);
                    }
                }
            }

            Console.WriteLine("Press ENTER to exit");
            Console.ReadLine();
        }

        private static void ProcessWordDocument(string wordFilePath, WordDocumentReader wordDocumentReader)
        {
            var consultantName = Path.GetDirectoryName(wordFilePath).Split(Path.DirectorySeparatorChar).Last();
            var cvContent = wordDocumentReader.ReadFile(wordFilePath);

            var foundSkills = new List<string>();
            foreach (var skillToSearchFor in KnownSkills)
            {
                if (Regex.IsMatch(cvContent, @"\b" + Regex.Escape(skillToSearchFor) + @"\b", RegexOptions.Multiline))
                {
                    foundSkills.Add(skillToSearchFor);
                }
            }

            SendSkillsToBackend(consultantName, foundSkills);
            Console.WriteLine("{0} ({1}): {2}", consultantName, Path.GetFileName(wordFilePath), string.Join(", ", foundSkills));
        }

        private static void SendSkillsToBackend(string consultantName, List<string> foundSkills)
        {
            var httpClient = new HttpClient();
            var namePair = new KeyValuePair<string, string>("Name", consultantName);
            var skillPairs = foundSkills.Select(x => new KeyValuePair<string, string>("Skills", x));
            httpClient.PostAsync("http://localhost:61952/api/consultants",
                new FormUrlEncodedContent(new[] {namePair}.Concat(skillPairs))).Wait();
        }
    }
}
