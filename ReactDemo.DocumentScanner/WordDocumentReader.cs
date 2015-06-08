using System;
using System.Text;

namespace ReactDemo.DocumentScanner
{
    public class WordDocumentReader : IDisposable
    {
        private Microsoft.Office.Interop.Word.Application word = new Microsoft.Office.Interop.Word.Application();

        public void Dispose()
        {
            word.Quit();
        }

        public string ReadFile(string filePath)
        {
            object miss = System.Reflection.Missing.Value;
            object path = filePath;
            object readOnly = true;

            Microsoft.Office.Interop.Word.Document docs = word.Documents.Open(ref path, ref miss, ref readOnly, ref miss, ref miss, ref miss, ref miss, ref miss, ref miss, ref miss, ref miss, ref miss, ref miss, ref miss, ref miss, ref miss);

            var stringBuilder = new StringBuilder();
            for (int i = 0; i < docs.Paragraphs.Count; i++)
            {
                stringBuilder.AppendLine(docs.Paragraphs[i + 1].Range.Text);
            }

            docs.Close();

            return stringBuilder.ToString();
        }
    }
}