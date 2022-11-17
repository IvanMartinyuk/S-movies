using DAL.Context;
using FilmsSpeedRunAPI.Config;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PexelsDotNetSDK.Api;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DAL
{
    public class IMDbService
    {
        List<Actor> Actors { get; set; } = new List<Actor>();
        List<Genre> Genres { get; set; } = new List<Genre>();
        List<Writer> Writers { get; set; } = new List<Writer>();
        List<Director> Directors { get; set; } = new List<Director>();
        List<Screenshot> Screenshots { get; set; } = new List<Screenshot>();
        Film Film { get; set; } = new Film();
        FilmContext context { get; set; }
        HttpClient client = new HttpClient();

        string apikey = "k_pz8gcst4";
        string path = "filmlist.txt";
        string photoApiKey = "563492ad6f91700001000001043a650f1cee45ed9079a5b40c98aad0";
        public IMDbService()
        {
            RequestOptions.MostPopular = apikey;
        }
        public async Task Fill(FilmContext context, int max = 100)
        {
            this.context = context;
            if (!context.Companies.Any(x => x.Name == "none"))
            {
                context.Companies.Add(new Company() { Name = "none", Description = "none" });
                context.SaveChanges();
            }
            Company companynone = context.Companies.FirstOrDefault(x => x.Name == "none");
            int companyid = companynone.Id;
            
            if (!File.Exists(path))
                await CreateFilmList();
            List<string> items = File.ReadAllLines(path).ToList();
            int count = max < items.Count ? max : items.Count;
            for (int i = 0; i < count; i++)
            {
                RequestOptions.Title = $"{apikey}/{items[i]}";
                using (HttpResponseMessage response = await client.GetAsync(new Uri(RequestOptions.Title)))
                {
                    JObject film = (JObject)JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync());
                    string filmid = items[i];
                    if (!context.Films.Any(x => x.ImdbId == filmid))
                    {
                        Film.ImdbId = filmid;
                        SetFilm(film);

                        Film.CompanyId = companyid;
                        context.Films.Add(Film);
                        context.SaveChanges();
                        Film = context.Films.FirstOrDefault(x => x.Title == Film.Title
                                                            && x.Image == Film.Image
                                                            && x.DateOfPublishing == Film.DateOfPublishing);
                        Film.Actors = Actors;
                        Film.Directors = Directors;
                        Film.Genres = Genres;
                        Film.Writers = Writers;
                        Film.Selections = new List<Selection>();
                        Film.Screenshots = Screenshots;
                        context.Films.Update(Film);
                        context.SaveChanges();
                        Clear();
                    }
                }
            }
        }
        void SetFilm(JObject film)
        {
            try
            {
                Film.Title = film["title"].ToString();
                try
                {
                    Film.ImdbRating = Convert.ToDouble(film["imDbRating"]);
                    Film.ImdbRatingVotes = Convert.ToInt32(film["imDbRatingVotes"]);
                }
                catch { }
                Film.DateOfPublishing = Convert.ToDateTime(film["releaseDate"]);
                Film.Image = film["image"].ToString();
                Film.Description = film["plot"].ToString();
                Film.TrailerUrl = film["trailer"]["linkEmbed"].ToString();
                SetGenres(film["genreList"].ToString()).Wait();
                SetCrew(film).Wait();
                SetScreenshots((JArray)film["images"]["items"]);
            }
            catch (HttpRequestException ex)
            {
                if (!File.Exists("errors.txt"))
                    File.Create("errors.txt").Close();
                File.AppendAllText("errors.txt", $"bad request - {ex.Message}");
            }
        }
        void SetScreenshots(JArray screenshots)
        {
            for (int i = 0; i < 5; i++)
                Screenshots.Add(new Screenshot { Url = screenshots[i]["image"].ToString() });
        }
        async Task SetCrew(JObject film)
        {
            var pexelsClient = new PexelsClient(photoApiKey);
            foreach (JObject director in (JArray)JsonConvert.DeserializeObject(film["directorList"].ToString()))
                if (context.Directors.Any(x => x.ImdbId == director["id"].ToString()))
                    Directors.Add(context.Directors.FirstOrDefault(x => x.ImdbId == director["id"].ToString()));
                else
                {
                    var photo = await pexelsClient.SearchPhotosAsync(director["name"].ToString());
                    Directors.Add(new Director() 
                    {
                        ImdbId = director["id"].ToString(), 
                        Name = director["name"].ToString()
                    });
                    if (photo.photos.Count > 0 && photo.photos[0].source.medium.Length > 0)
                        Directors.Last().Image = photo.photos[0].source.medium;
                }
            foreach (JObject writer in (JArray)JsonConvert.DeserializeObject(film["writerList"].ToString()))
                if (context.Writers.Any(x => x.ImdbId == writer["id"].ToString()))
                    Writers.Add(context.Writers.FirstOrDefault(x => x.ImdbId == writer["id"].ToString()));
                else
                {
                    var photo = await pexelsClient.SearchPhotosAsync(writer["name"].ToString());
                    Writers.Add(new Writer()
                    {
                        ImdbId = writer["id"].ToString(),
                        Name = writer["name"].ToString(),
                    });
                    if (photo.photos.Count > 0 && photo.photos[0].source.medium.Length > 0)
                        Writers.Last().Image = photo.photos[0].source.medium;
                }
            int i = 0;
            foreach (JObject actor in (JArray)JsonConvert.DeserializeObject(film["actorList"].ToString()))
            {
                if (i > 10)
                    break;
                if (context.Actors.Any(x => x.ImdbId == actor["id"].ToString()))
                    Actors.Add(context.Actors.FirstOrDefault(x => x.ImdbId == actor["id"].ToString()));
                else
                {
                    Actors.Add(new Actor()
                    {
                        ImdbId = actor["id"].ToString(),
                        Name = actor["name"].ToString(),
                    });
                    if (actor["image"].ToString().Length > 0)
                        Actors.Last().Image = actor["image"].ToString();
                }
                i++;
            }
        }
        async Task SetGenres(string genresList)
        {
            JArray genres = (JArray)JsonConvert.DeserializeObject(genresList);
            foreach(JObject genre in genres)
            {
                string name = genre["value"].ToString();
                if (!context.Genres.Any(x => x.Name.ToLower().Equals(name.ToLower())))
                    Genres.Add(new Genre() { Name = name });
                else
                    Genres.Add(context.Genres.FirstOrDefault(x => x.Name.ToLower().Equals(name.ToLower())));
            }
        }
        public async Task CreateFilmList()
        {
            using (HttpResponseMessage response = await client.GetAsync(new Uri(RequestOptions.MostPopular)))
            {
                JObject obj = (JObject)JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync());
                JArray items = (JArray)obj["items"];
                File.Create(path).Close();
                foreach (var item in items)
                    File.AppendAllText(path, $"{item["id"]}\n");
            }
        }
        void Clear()
        {
            this.Genres = new List<Genre>();
            this.Actors = new List<Actor>();
            this.Directors = new List<Director>();
            this.Writers = new List<Writer>();
            this.Screenshots = new List<Screenshot>();
            Film = new Film();
        }
    }
}
