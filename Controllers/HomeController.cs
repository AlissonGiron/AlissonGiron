using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AlissonGiron.Models;
using System.Net.Http;
using System.Web;

namespace AlissonGiron.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpGet]
        public IActionResult GetCurrPlayingMusic() {

            HttpClient LHttp = new HttpClient();

            var builder = new UriBuilder("https://api.spotify.com/v1/me/player/currently-playing?market=BR");
            var query = HttpUtility.ParseQueryString(builder.Query);
            query["Authorization"] = "Bearer BQC4i3UVg8KyGPyFPUwp_65zw8MSsMih71zqoZWgdptllLHcAGYtt42HWeM_gOPX8zpsGpBYxUoOq_VtgAQFnqyuV-4g3V4EirdR-U85BQ562Lt7Rj34K6_SnvprNfdpJlZIVZLkC78ri9OpB046V4g";
            builder.Query = query.ToString();
            string url = builder.ToString();

            var LResponse = LHttp.GetAsync(url);

            

            return Json(LResponse);
        }
    }
}