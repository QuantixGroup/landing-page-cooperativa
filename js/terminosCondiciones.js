$(document).ready(function () {
  let cerrarBoton = false;

  $("#terminos").on("change", function () {
    if ($(this).is(":checked")) {
      $("#terminosModal").modal("show");
    }
  });

  $("#terminosModal").on("click", ".btn-send", function () {
    cerrarBoton = true;
    $("#terminosModal").modal("hide");
  });

  $("#terminosModal").on("click", ".btn-close", function () {
    cerrarBoton = false;
    $("#terminosModal").modal("hide");
  });

  $("#terminosModal").on("hidden.bs.modal", function () {
    if (!cerrarBoton) {
      $("#terminos").prop("checked", false);
    }
    cerrarBoton = false;
  });
});
