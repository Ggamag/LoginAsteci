using CMOD_UPAX;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;

namespace CAD_UPAX
{
    public class CAD_Login
    {
        UPAXBDEntiti db = new UPAXBDEntiti();
        public Mod_Session ValidUser(string Login, string Pass)
        {
            var Result = db.Database.SqlQuery<Mod_Session>("SP_LOGIN_VALIDATE @Login, @Pass", 
                                                new SqlParameter("@Login", Login),
                                                new SqlParameter("@Pass", Pass)).ToList();

            Mod_Session InfoUser = new Mod_Session();
            foreach (var item in Result)
            {
                InfoUser.Usr_Name = item.Usr_Name;
                InfoUser.Usr_LastName = item.Usr_LastName;
                InfoUser.Usr_Login = item.Usr_Login;
                InfoUser.Usr_Mail = item.Usr_Mail;
            }

            return InfoUser;
        }

        public string ValidLogin(string Login)
        {
            var Result = db.Database.SqlQuery<Resultado>("SP_LOGIN_EXIST @Usuario",
                                                new SqlParameter("@Usuario", Login)).ToList();

            return Result[0]._Resultado;
        }

        public int CrudUser(int Action, Mod_Usr_Usuarios Modelo)
        {
            var Result = db.Database.ExecuteSqlCommand("SP_CRUD_USER @ACTION, @USRID, @NAME, @LASTN, @MAIL, @PHONE, @LOGIN, @PASS, @ACT",
                                                new SqlParameter("@ACTION", Action),
                                                new SqlParameter("@USRID", Modelo.Usr_Id),
                                                new SqlParameter("@NAME", Modelo.Usr_Name),
                                                new SqlParameter("@LASTN", Modelo.Usr_LastName),
                                                new SqlParameter("@MAIL", Modelo.Usr_Mail),
                                                new SqlParameter("@PHONE", Modelo.Usr_Phone),
                                                new SqlParameter("@LOGIN", Modelo.Usr_Login),
                                                new SqlParameter("@PASS", Modelo.Usr_Pass),
                                                new SqlParameter("@ACT", Modelo.Usr_Active));
            SendMailNewUser(Modelo.Usr_Mail, Modelo.Usr_Name);
            return Result;
        }

        public int UserDel(int Action, int ID)
        {
            var Result = db.Database.ExecuteSqlCommand("SP_CRUD_USER @ACTION, @USRID, @NAME, @LASTN, @MAIL, @PHONE, @LOGIN, @PASS, @ACT",
                                                new SqlParameter("@ACTION", Action),
                                                new SqlParameter("@USRID", ID),
                                                new SqlParameter("@NAME", ""),
                                                new SqlParameter("@LASTN", ""),
                                                new SqlParameter("@MAIL", ""),
                                                new SqlParameter("@PHONE", ""),
                                                new SqlParameter("@LOGIN", ""),
                                                new SqlParameter("@PASS", ""),
                                                new SqlParameter("@ACT", "1"));
            return Result;
        }

        public List<Mod_Usr_Usuarios> GetUsers()
        {
            var Result = db.Database.SqlQuery<Mod_Usr_Usuarios>("SP_GET_USR").ToList();
            return Result;
        }

        public List<Mod_Usr_Usuarios> DetailUser(int ID)
        {
            var Result = db.Database.SqlQuery<Mod_Usr_Usuarios>("SP_DETAIL_USR @ID", new SqlParameter("@ID", ID)).ToList();
            return Result;
        }

        public void SendMailNewUser(string Mail, string Name)
        {
            try
            {
                var fromAddress = new MailAddress("jmmailmvc@gmail.com", "Soluciones Empresariales");
                var toAddress = new MailAddress(Mail, Name);
                const string fromPassword = "MvcMail2020";
                const string subject = "Bienvenido";
                string body = string.Format("Hola {0}. Apartir de este momento ya podras acceder al sistema para ver los resultados semanales", Name);

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
                    Timeout = 20000
                };
                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }
            }
            catch (Exception Ex)
            {

                throw Ex;
            }            
        }

        private class Resultado
        {
            public string _Resultado { get; set; }
        }
    }
}
