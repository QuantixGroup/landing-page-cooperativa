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
  }, 12000);
}
