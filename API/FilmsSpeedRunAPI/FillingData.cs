using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmsSpeedRunAPI
{
    public class FillingData
    {
        public static void Fill(FilmContext context)
        {
            context.Roles.Add(new Role() { Name = "user" });
            context.Roles.Add(new Role() { Name = "admin" });
            context.SaveChanges();

            context.Users.Add(new User() { Login = "admin", PasswordHash = "2af9b1ba42dc5eb01743e6b3759b6e4b", RoleId = 2 });
            List<Film> films = new List<Film>() {
                new Film()
                {
                    Title = "Фильм Лига справедливости Зака Снайдера",
                    Image = "https://upload.wikimedia.org/wikipedia/ru/3/38/%D0%9B%D0%B8%D0%B3%D0%B0_%D1%81%D0%BF%D1%80%D0%B0%D0%B2%D0%B5%D0%B4%D0%BB%D0%B8%D0%B2%D0%BE%D1%81%D1%82%D0%B8_%D0%97%D0%B0%D0%BA%D0%B0_%D0%A1%D0%BD%D0%B0%D0%B9%D0%B4%D0%B5%D1%80%D0%B0.png",
                    Description = @"Долгожданная оригинальная версия фильма «Лига Справедливости» (2017), которую Зак Снайдер планировал снять до своего ухода с поста режиссёра. Режиссер принял решение смонтировать фильм в обожаемом им формате 4:3. После героического самопожертвования Супермена Брюс Уэйн заново обретает веру в людей. С помощью Чудо-женщины Бэтмен набирает супергероев в Лигу Справедливости, чтобы вместе сразиться с могущественным Степным волком.
                                    После смерти Супермена мир переживает не лучшие времена: в обществе царит напряжение, а богатым и властным людям, у которых есть влияние и сила, сходят с рук любые бесчинства. Луис Лейн, жена Супермена, больше не занимается громкими разоблачениями преступников и не пишет разгромные репортажи. Тем временем суперзлодей Степной волк, на стороне которого выступают летающие парадемоны, планирует превратить Землю в настоящий ад. Противостоять ему может лишь Бэтмен и его соратники. Вдохновлённый трагическим самопожертвованием Супермена, Брюс Уэйн вместе с Чудо-женщиной, Акваменом, бегуном Флэшем и компьютерным гением Киборгом выступают против Степного волка и его приспешников.
                                    Получится ли у Лиги Справедливости остановить злодеев и спасти мир? Приглашаем поклонников вселенной DC познакомиться с режиссёрской версией истории и посмотреть онлайн фильм «Лига справедливости Зака Снайдера».",
                    Rating = 8.2,
                    DateOfPublishing = new DateTime(2021, 3, 18),
                    Actors = new List<Actor>()
                        {
                            new Actor() { Name = "Генри Кавилл", Image = "https://www.google.com/search?q=%D0%93%D0%B5%D0%BD%D1%80%D0%B8+%D0%9A%D0%B0%D0%B2%D0%B8%D0%BB%D0%BB&sa=X&rlz=1C1CHZN_ruUA957UA957&stick=H4sIAAAAAAAAAAFHALj_CAMSDS9nLzExajEyMHkzZjAiCS9tLzA3MGM5aCoMTW92aWVUb0FjdG9yogUX0JPQtdC90YDQuCDQmtCw0LLQuNC70Lu4BQG6SyjCRwAAAA&biw=1536&bih=730&sxsrf=AOaemvLiGKJs1wTJB2kPWCg0giq1_lqHtQ:1638977092750&tbm=isch&source=iu&ictx=1&fir=XWzXPF0c1VMDHM%252CT7IEsVUw6mH1UM%252C%252Fm%252F070c9h%253BHgK6OJZrP5gMyM%252CfTSbrh48-NYBcM%252C_%253BCG5vgskMyAln6M%252CWdViJ-xtIYz3EM%252C_%253BzJjwRC4MKkY5lM%252CRWqDMp2W8CCq7M%252C_%253BFh_4gra9XD4FHM%252C5SzPjq2y5XVjZM%252C_%253BzzeL7D_GG_ph5M%252CfTSbrh48-NYBcM%252C_%253B_JHmmSjGP94MEM%252CW4aWvv6pPocMFM%252C_%253Bgx1sVuqwulq-oM%252C3b7LGctNiQRV7M%252C_&vet=1&usg=AI4_-kT5V-7H8bmuOWquTLnluwW_7Vy3RQ&ved=2ahUKEwjZr6G7wdT0AhWI8bsIHUW2CpQQ_B16BAhOEAE#imgrc=XWzXPF0c1VMDHM"},
                            new Actor() { Name = "Джаред Лето", Image = "https://www.google.com/search?q=%D0%94%D0%B6%D0%B0%D1%80%D0%B5%D0%B4+%D0%9B%D0%B5%D1%82%D0%BE&rlz=1C1CHZN_ruUA957UA957&stick=H4sIAAAAAAAAAAFIALf_CAMSDS9nLzExajEyMHkzZjAiCS9tLzAyZnlibCoMTW92aWVUb0FjdG9yogUV0JTQttCw0YDQtdC0INCb0LXRgtC-uAUBkAYB5W4S8UgAAAA&sxsrf=AOaemvIm_-Ryp6BR2RBnzvYLiRFZIqgdJA:1638977135941&tbm=isch&source=iu&ictx=1&fir=smKekjbSjCqXCM%252CZkCi5n_Zso0I8M%252C%252Fm%252F02fybl%253B05PTLa45leo6bM%252CGvlWYrKcgNl_3M%252C_%253BJA0Megl70yrzJM%252CZBaICtdSRoZ8yM%252C_%253BQrzkKBi3fXbCVM%252CNgnlH7EqP1lcZM%252C_%253BDgdakqs3tRhLuM%252C0BerAFyy5irAjM%252C_%253B2JzSmVSy4Ue-8M%252CZkCi5n_Zso0I8M%252C_%253B0GH8xI68erfZrM%252CoG-Opwe3dYJd_M%252C_&vet=1&usg=AI4_-kQjxmjeg0UNrPI6BSZXeR_t8rUoiw&sa=X&ved=2ahUKEwiu_enPwdT0AhVrg_0HHcH_BUAQ_B16BAgcEAE#imgrc=smKekjbSjCqXCM"},
                            new Actor() { Name = "Гарри Ленникс", Image = "https://www.google.com/search?q=%D0%93%D0%B0%D1%80%D1%80%D0%B8+%D0%9B%D0%B5%D0%BD%D0%BD%D0%B8%D0%BA%D1%81&rlz=1C1CHZN_ruUA957UA957&stick=H4sIAAAAAAAAAONgFuLVT9c3NMwyNDKoNE4zUOLUz9U3sEhPy83T4vHNL8tMDcl3TC7JL1rEKnlh8oUNFxsuNlzYoXBh9oWtF_YC4Y4Luy427mBlnMDGCABqwB8rTAAAAA&sxsrf=AOaemvJLg7aiwMa0Gt3LLBF67bLGZAo8_Q:1638977182928&tbm=isch&source=iu&ictx=1&fir=ZS3z1U2fWvGAlM%252C7tUIGJoLXuojLM%252C%252Fm%252F08gfmn%253BJ5Dkm5wwyNuW4M%252CaGoGZpmI2los3M%252C_%253Bq9rfLMAKsg4H8M%252CQ_nbvKPLaShTpM%252C_%253B8vYHrKYnBQ1XcM%252Ci-lnADpiPYjqAM%252C_%253BOwQ2wT2od_JGnM%252Chaf9UUJrwC77sM%252C_%253BDTNkEygut6n3pM%252CrhX3gr3nidZspM%252C_%253BkUggnx2BjaYg8M%252C0PibykkGLgctMM%252C_%253Bj3glfnkhTkicbM%252CmmlM2etD9pDKYM%252C_&vet=1&usg=AI4_-kSzrZll_in3rUUEyLIpTJ68afHn6g&sa=X&ved=2ahUKEwibnZ_mwdT0AhUIhP0HHcaXAcYQ_B16BAgkEAE#imgrc=ZS3z1U2fWvGAlM" },
                            new Actor() { Name = "Галь Гадот", Image = "https://m.media-amazon.com/images/M/MV5BYThjM2NlOTItYTUzMC00ODE3LTk1MTItM2I3MDViY2U3MThlXkEyXkFqcGdeQXVyMTg4NDI0NDM@._V1_UY317_CR20,0,214,317_AL_.jpg"},
                            new Actor() { Name = "Эми Адамс", Image = "https://m.media-amazon.com/images/M/MV5BMTg2NTk2MTgxMV5BMl5BanBnXkFtZTgwNjcxMjAzMTI@._V1_UX214_CR0,0,214,317_AL_.jpg"},
                            new Actor() { Name = "Джейсон Момоа", Image = "https://m.media-amazon.com/images/M/MV5BODJlNWQ4ZjUtYjRhNi00NGQ1LWE3YTItYjRmZGI3YzI4YTEyXkEyXkFqcGdeQXVyMTA2MDIzMDE5._V1_UY317_CR130,0,214,317_AL_.jpg"}
                        },
                    Directors = new List<Director>() { new Director() { Name = "Зак Снайдер" } },
                    Producers = new List<Producer>() 
                        {
                            new Producer() { Name = "Зак Снайдер", Image = "https://m.media-amazon.com/images/M/MV5BMTMzMjUyNjk1MV5BMl5BanBnXkFtZTcwMDc2Mzk3NA@@._V1_UY317_CR11,0,214,317_AL_.jpg" },
                            new Producer() { Name = "Джерри Сигел", Image = "https://m.media-amazon.com/images/M/MV5BMjY1MzJmMWUtNWQ1YS00MGNiLTljN2ItNGE5M2M2OTU5YjhiXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UY317_CR22,0,214,317_AL_.jpg"},
                            new Producer() { Name = "Джо Шустер", Image = "https://m.media-amazon.com/images/M/MV5BMDdmMzA2MGYtZjFiZS00Nzg5LWE5MTctNTI0NWM4ZjI0YzdmXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UY317_CR20,0,214,317_AL_.jpg"}
                        },
                    Company = new Company() { Name = "Warner Bros. Pictures", Description = "Warner Bros. Entertainment, Inc. (ранее Warner Bros. Pictures), (обычно называется Warner Bros., по-русски Братья Уо́рнер) — один из крупнейших концернов по производству фильмов и телесериалов в США. В настоящее время подразделение группы компаний WarnerMedia с офисом в Калифорнии"}
                }
            };
            foreach (var f in films)
                context.Films.Add(f);

            context.SaveChanges();
        }
    }
}
