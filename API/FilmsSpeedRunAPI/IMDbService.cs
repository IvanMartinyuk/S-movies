using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class IMDbService
    {
        List<string> Keys { get; set; } = new List<string>()
        {
            "7ef43245c4mshac5fc45f9e208c9p1f232fjsn3025f98d6bf2",
            "435dfaea54msh1aa1c937bf9b812p13124ajsnabd40e03bc3a",
            "27a4830c30msha630a0a35dd25ccp132159jsn0537ae15bf3d",
            "4dbb91712cmshd464273d3609b9ep1be5f5jsndd7ae61152d1",
            "e2992cda15msh599323ea4f45d0dp1124ccjsnd4b8087047d4",
            "44f4f00c4fmshd2d46db26679567p117cb3jsn506cb1f5bb54",
            "7467395e30msh911943b787d67b4p1adf6djsncee5f2744cae"
        };
        public async void FillData(FilmContext context)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr"),
                Headers =
                {
                    { "x-rapidapi-host", "imdb8.p.rapidapi.com" },
                    { "x-rapidapi-key", "" },
                },
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
            }
        }
    }
}
