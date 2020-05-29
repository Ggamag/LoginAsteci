using CAD_UPAX;
using CMOD_UPAX;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UPAXSESION.Controllers
{
    public class UsersController : Controller
    {
        CAD_Login MTD = new CAD_Login();
        public ActionResult Index()
        {
            ViewBag.Title = "Catalogo Usuarios";
            if (Session["InfoUser"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            Mod_Session obj = (Mod_Session)Session["InfoUser"];
            ViewBag.Login = obj;
            return View();
        }

        public JsonResult LoadUser()
        {
            var ListUser = MTD.GetUsers();
            return Json(ListUser, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DetailUser(int ID)
        {
            var ListUser = MTD.DetailUser(ID);
            return Json(ListUser, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Modify(Mod_Usr_Usuarios Usuario)
        {
            var Response = MTD.CrudUser(2, Usuario);
            return Json(Response, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            var Response = MTD.UserDel(3, ID);
            return Json(Response, JsonRequestBehavior.AllowGet);
        }

    }
}
