$(document).ready(function () {
  $("#formulario").submit(function (e) {
    e.preventDefault();

    var terminos = $("#terminos").is(":checked");
    var datosPersonales = $("#datosPersonales").is(":checked");
    if (!terminos || !datosPersonales) {
      mostrarAlerta(
        "Para continuar, debe aceptar los términos y condiciones y autorizar el uso de sus datos personales.",
        "danger"
      );
      return;
    }

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
      fecha_egreso: null,
    };

    $.ajax({
      url: "http://localhost:8000/api/socios",
      type: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
      success: function (response) {
        mostrarAlerta("Formulario enviado correctamente", "success");
        console.log(response);
        $("#formulario")[0].reset();
        $("#terminos").prop("checked", false);
        $("#datosPersonales").prop("checked", false);
      },
      error: function (xhr) {
        console.error("Error:", xhr.responseText);
        mostrarAlerta("No se pudo enviar el formulario", "danger");
      },
    });
  });
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
