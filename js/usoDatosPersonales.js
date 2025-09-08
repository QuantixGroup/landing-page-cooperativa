$(document).ready(function () {
  let cerrarBoton = false;

  $("#datosPersonales").on("change", function () {
    if ($(this).is(":checked")) {
      $("#datosPersonalesModal").modal("show");
    }
  });

  $("#datosPersonalesModal").on("click", ".btn-send", function () {
    cerrarBoton = true;
    $("#datosPersonalesModal").modal("hide");
  });

  $("#datosPersonalesModal").on("click", ".btn-close", function () {
    cerrarBoton = false;
    $("#datosPersonalesModal").modal("hide");
  });

  $("#datosPersonalesModal").on("hidden.bs.modal", function () {
    if (!cerrarBoton) {
      $("#datosPersonales").prop("checked", false);
    }
    cerrarBoton = false;
  });
});
