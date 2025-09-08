
$(document).ready(function () {

    $("#formulario").on("submit", function (evento) {
        evento.preventDefault();

        const datos = {
            cedula: $("#documento").val().trim(),
            nombre: $("#nombre").val().trim(),
            apellido: $("#apellido").val().trim(),
            fecha_nacimiento: $("#fechaNacimiento").val(),
            telefono: $("#telefono").val().trim(),
            direccion: $("#direccion").val().trim(),
            departamento: $("#departamento").val().trim(),
            ciudad: $("#ciudad").val().trim(),
            email: $("#email").val().trim(),
            ingreso_mensual: $("#ingresos").val(),
            situacion_laboral: $("#situacionLaboral").val(),
            integrantes_familiares: $("#integrantes").val(),
            mensaje: $("#mensaje").val()
        };

        $.ajax({
            url: API_USUARIOS + "/socios",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(datos),
            success: function () {
                mostrarMensaje("Solicitud enviada con éxito");
                $("#formulario")[0].reset();
            },
            error: function (xhr) {
                const respuesta = xhr.responseJSON || {};
                mostrarMensaje("No se pudo enviar la solicitud" + (respuesta.message ? `: ${respuesta.message}` : ""), true);
            }
        });
    });

    function mostrarMensaje(texto, esError = false) {
        $("#mensaje-landing").text(texto).css("color", esError ? "red" : "green");
    }
});
