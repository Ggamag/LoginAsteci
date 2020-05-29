function ClearRegister() {
    $("#ValName").val("");
    $("#ValLastN").val("");
    $("#ValMail").val("");
    $("#Valphone").val("");
    $("#ValUser").val("");
    $("#Valpass").val("");
    $("#Valpass2").val("");
    $("#LblErrorRegister").html("");
}

function ClearLogin() {
    $("#TxtLogin").val("");
    $("#TxtPass").val("");
}


$("#BtnRegister").click(function () {
    $("#PanelLogin").css("display", "none");
    $("#PanelRegister").css("display", "block");
});

$("#BtnRecovery").click(function () {
    $("#PanelLogin").css("display", "none");
    $("#PanelRecovery").css("display", "block");
});

$(".BtnLogin").click(function () {
    ClearLogin();
    ClearRegister();
    $("#PanelLogin").css("display", "block");
    $("#PanelRegister").css("display", "none");
    $("#PanelRecovery").css("display", "none");
});


$("#BtnRegistra").click(function () {
    var Name = $("#ValName").val();
    var LName = $("#ValLastN").val();
    var Mail = $("#ValMail").val();
    var Phone = $("#Valphone").val();
    var Login = $("#ValUser").val();
    var Pass = $("#Valpass").val();
    var Pass2 = $("#Valpass2").val();
    if (Name == "") {
        $("#LblErrorRegister").html("El campo nombre no puede ir vacio");
        $("#ValName").focus();
    } else if (LName == "") {
        $("#LblErrorRegister").html("El campo apellido no puede ir vacio");
        $("#ValLastN").focus();
    } else if (Mail == "") {
        $("#LblErrorRegister").html("El campo correo no puede ir vacio");
        $("#ValMail").focus();
    } else if (Phone == "") {
        $("#LblErrorRegister").html("El campo telefono no puede ir vacio");
        $("#Valphone").focus();
    } else if (Login == "") {
        $("#LblErrorRegister").html("El campo usuario no puede ir vacio");
        $("#ValUser").focus();
    } else if (Pass == "") {
        $("#LblErrorRegister").html("El campo contraseña no puede ir vacio");
        $("#Valpass").focus();
    } else if (Pass2 == "") {
        $("#LblErrorRegister").html("El campo contraseña no puede ir vacio");
        $("#Valpass").focus();
    } else if (Pass != Pass2) {
        $("#LblErrorRegister").html("Las contraseñas no coinciden favor de validarlas");
        $("#Valpass").focus();
    } else {
        var Send = { Usr_Id: 0, Usr_Name: Name, Usr_LastName: LName, Usr_Mail: Mail, Usr_Phone: Phone, Usr_Login: Login, Usr_Pass: Pass, Usr_Active: 1 };
        $.post("/Login/NewAccount", Send,
            function (data) {
                if (data == "existe") {
                    $("#LblErrorRegister").html("Este usuario ya existe favor de escribir uno diferente");
                    $("#ValUser").focus();
                } else {
                    $("#PanelLogin").css("display", "block");
                    $("#PanelRegister").css("display", "none");
                    ClearLogin();
                    ClearRegister();
                    swal("Registro guardado", "Se ha enviado un correo de bienvenida y desde este momento podras ingresar al sistema", "success");
                }
            },
            "json"
        );
    }
});

$("#BtnIngresar").click(function () {
    var Login = $("#TxtLogin").val();
    var Pass = $("#TxtPass").val();

    if (Login == "") {
        $("#LblErrorLogin").html("El campo usuario no puede ir vacio");
    } else if (Pass == "") {
        $("#LblErrorLogin").html("El campo contraseña no puede ir vacio");
    } else {
        var Send = { Login: Login, Pass: Pass };
        $.post("/Login/validateuser", Send,
            function (data) {
                if (data == 'Access') {
                    var url = '/Home/Index';
                    window.location.href = url;
                } else {
                    $("#LblErrorLogin").html(data);
                }
            });
    }
});
