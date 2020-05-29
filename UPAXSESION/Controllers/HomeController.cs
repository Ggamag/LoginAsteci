using CMOD_UPAX;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UPAXSESION.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            if(Session["InfoUser"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            Mod_Session obj = (Mod_Session)Session["InfoUser"];
            ViewBag.Login = obj;
            return View();
        }
    }
}
