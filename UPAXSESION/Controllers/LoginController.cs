using CAD_UPAX;
using CMOD_UPAX;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace UPAXSESION.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        CAD_Login MTD = new CAD_Login();
        public ActionResult Index()
        {
            return View();
        }
                
        public ActionResult validateuser(string Login, string Pass)
        {
            var Result = MTD.ValidUser(Login, Pass);
            var Valida = Result.Usr_Login;
            if(Valida != null)
            {
                Session["InfoUser"] = Result;
                Session["Usuario"] = Valida;
                return Json("Access", JsonRequestBehavior.AllowGet);
            }
            else
            {
                string _Valida = "Usuario o contraseña invalidos";
                return Json(_Valida, JsonRequestBehavior.AllowGet);
            }            
        }

        public ActionResult NewAccount(Mod_Usr_Usuarios Usuario)
        {
            string Result = "";
            var Exist = MTD.ValidLogin(Usuario.Usr_Login);
            if(Exist != "0")
            {
                Result = "existe";
            }
            else
            {
                var Response = MTD.CrudUser(1, Usuario);
                Result = Response.ToString();
            }

            return Json(Result, JsonRequestBehavior.AllowGet);
        }



    }
}
