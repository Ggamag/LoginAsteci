$(document).ready(function () {
    LoadUsers();
});

function LoadUsers() {
    $.post("/Users/LoadUser", function (data) {
        $("#DTUser > tbody").html("");
        var rows = "";
        $.each(data, function (i, val) {
            rows += '<tr>';
            rows += '<td>' + val.Usr_Login +'</td>';
            rows += '<td>' + val.Usr_Name +'</td>';
            rows += '<td>' + val.Usr_LastName +'</td>';
            rows += '<td>' + val.Usr_Mail +'</td>';
            rows += '<td>' + val.Usr_Phone + '</td>';
            if (val.Usr_Active != false) {
                rows += '<td class="text-center"><input type="checkbox"  checked="checked" class="checkbox" /></td>';
            } else {
                rows += '<td class="text-center"><input type="checkbox" class="checkbox" /></td>';
            }            
            rows += '<td><button class="btn btn-default BtnDetail" data-id="' + val.Usr_Id +'"><span class="glyphicon glyphicon-edit"></span></button></td>';
            rows += '<td><button class="btn btn-danger BtnDelete" data-id="' + val.Usr_Id +'"><span class="glyphicon glyphicon-trash"></span></button></td>';
            rows += '</tr>';
        });
        $("#DTUser > tbody").append(rows);
    });
}

$(document).on("click", ".BtnDetail", function () {
    var Vid = $(this).data("id");
    //$("#TxtLogin").prop("disabled", false);
    $("#IdUser").prop("disabled", false);
    $("#TxtName").prop("disabled", false);
    $("#TxtLast").prop("disabled", false);
    $("#TxtMail").prop("disabled", false);
    $("#TxtPhone").prop("disabled", false);
    $("#TxtPass").prop("disabled", false);
    $("#TxtACt").prop("disabled", false);
    $("#BtnSave").prop("disabled", false);
    
    $.post("/Users/DetailUser", { ID: Vid }, function (data) {
        $("#TxtLogin").val(data[0].Usr_Login);
        $("#IdUser").val(data[0].Usr_Id);
        $("#TxtName").val(data[0].Usr_Name);
        $("#TxtLast").val(data[0].Usr_LastName);
        $("#TxtMail").val(data[0].Usr_Mail);
        $("#TxtPhone").val(data[0].Usr_Phone);
        $("#TxtPass").val(data[0].Usr_Pass);
        if (data[0].Usr_Active == true) { $('#TxtACt').attr('checked', true); } else { $('#TxtACt').attr('checked', false);} 
    });
});

$(document).on("click", ".BtnDelete", function () {
    var Vid = $(this).data("id");
    swal({
        title: "Eliminar usuario",
        text: "Estas a punto de eliminar este usuario estas seguro de hacerlo?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var Send = { ID: Vid };
                $.post("/Users/Delete", Send, function (data) {
                    swal("Registro Eliminado", "El usuarios a sido eliminado con exíto", "success");
                    ClearForm();
                    LoadUsers();
                });
            } else {
                return;
            }
        });
});

$("#BtnSave").click(function () {
    var Name = $("#TxtName").val();
    var LName = $("#TxtLast").val();
    var Mail = $("#TxtMail").val();
    var Phone = $("#TxtPhone").val();
    var Login = $("#TxtLogin").val();
    var Pass = $("#TxtPass").val();
    var Act = $("#TxtACt").val();
    var ID = $("#IdUser").val();
    if (Name == "") {
        swal("Atencion", "El campo nombre no puede ir vacio", "error");
        $("#TxtName").focus();
    } else if (LName == "") {
        swal("Atencion", "El campo apellido no puede ir vacio", "error");
        $("#TxtLast").focus();
    } else if (Mail == "") {
        swal("Atencion", "El campo correo no puede ir vacio", "error");
        $("#TxtMail").focus();
    } else if (Phone == "") {
        swal("Atencion", "El campo telefono no puede ir vacio", "error");
        $("#TxtPhone").focus();
    } else if (Login == "") {
        swal("Atencion", "El campo usuario no puede ir vacio", "error");
        $("#TxtLogin").focus();
    } else if (Pass == "") {
        swal("Atencion", "El campo contraseña no puede ir vacio", "error");
        $("#TxtPass").focus();
    } else {
        var Send = { Usr_Id: ID, Usr_Name: Name, Usr_LastName: LName, Usr_Mail: Mail, Usr_Phone: Phone, Usr_Login: Login, Usr_Pass: Pass, Usr_Active: 1 };
        $.post("/Users/Modify", Send, function (data) {
            swal("Registro guardado", "El usuarios a sido guardado con exíto", "success");
            ClearForm();
            LoadUsers();
        });
    }
});


function ClearForm() {
    $("#IdUser").prop("disabled", true);
    $("#TxtName").prop("disabled", true);
    $("#TxtLast").prop("disabled", true);
    $("#TxtMail").prop("disabled", true);
    $("#TxtPhone").prop("disabled", true);
    $("#TxtPass").prop("disabled", true);
    $("#TxtACt").prop("disabled", true);
    $("#BtnSave").prop("disabled", true);
    $("#TxtLogin").val("");
    $("#IdUser").val("");
    $("#TxtName").val("");
    $("#TxtLast").val("");
    $("#TxtMail").val("");
    $("#TxtPhone").val("");
    $("#TxtPass").val("");
    $('#TxtACt').attr('checked', false);  
}