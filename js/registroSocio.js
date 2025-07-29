$(document).ready(function () {
    $("#formulario").submit(function (e) {
        e.preventDefault();

        var data = {
            cedula: $("#documento").val(),
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
            fecha_nacimiento: $("#fechaNacimiento").val(),
            telefono: $("#telefono").val(),
            direccion: $("#direccion").val(),
            departamento: $("#departamento").val(),
            ciudad: $("#ciudad").val(),
            email: $("#email").val(),
            contraseña: $("#documento").val(),
            ingreso_mensual: $("#ingresos").val(),
            situacion_laboral: $("#situacionLaboral option:selected").val(), 
            estado: "pendiente",
            integrantes_familiares: $("#integrantes").val(),
            fecha_ingreso: null,
            fecha_egreso: null
        };

        $.ajax({
            url: "http://localhost:8000/api/socios",
            type: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data),
            success: function (response) {
                alert("Formulario enviado correctamente");
                console.log(response);
            },
            error: function (xhr) {
                console.error("Error:", xhr.responseText);
                $("#error").html("No se pudo enviar el formulario");
            }
        });
    });
});
