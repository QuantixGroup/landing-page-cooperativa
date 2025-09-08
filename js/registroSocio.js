
$(document).ready(function () {

  $("#formulario").on("submit", function (evento) {
    evento.preventDefault();

    var terminos = $("#terminos").is(":checked");
    var datosPersonales = $("#datosPersonales").is(":checked");

    if (!terminos || !datosPersonales) {
      mostrarAlerta(
        "Para continuar, debe aceptar los términos y condiciones y autorizar el uso de sus datos personales.",
        "danger"
      );
      return;
    }

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
                $("#terminos").prop("checked", false);
                $("#datosPersonales").prop("checked", false);
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

function mostrarAlerta(mensaje, tipo = "success") {
  $("#alertas").empty();
  let icon = "";
  let alertClass = "";
  switch (tipo) {
    case "success":
      icon = '<i class="bi bi-check-circle-fill me-2"></i>';
      alertClass = "alert-success";
      break;
    case "danger":
      icon = '<i class="bi bi-x-circle-fill me-2"></i>';
      alertClass = "alert-danger";
      break;
    case "warning":
      icon = '<i class="bi bi-exclamation-triangle-fill me-2"></i>';
      alertClass = "alert-warning";
      break;
    case "info":
      icon = '<i class="bi bi-info-circle-fill me-2"></i>';
      alertClass = "alert-info";
      break;
    default:
      icon = "";
      alertClass = `alert-${tipo}`;
  }
  const alertHtml = `<div class="alert ${alertClass} fade show mt-3" role="alert">
    ${icon}${mensaje}
  </div>`;
  $("#alertas").html(alertHtml);
  $("#error").empty();
  $("#success").empty();
  setTimeout(() => {
    $("#alertas .alert").alert("close");
  }, 8000);
}
