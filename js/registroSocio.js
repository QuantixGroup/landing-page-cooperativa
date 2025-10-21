$(document).ready(function () {
  const terminosModalEl = document.getElementById("terminosModal");
  const datosModalEl = document.getElementById("datosPersonalesModal");
  const terminosModal = terminosModalEl
    ? new bootstrap.Modal(terminosModalEl)
    : null;
  const datosModal = datosModalEl ? new bootstrap.Modal(datosModalEl) : null;

  function bindCheckboxModal(selector, modalInstance, modalEl) {
    $(selector)
      .on("pointerdown", function (e) {
        if (!$(this).is(":checked")) {
          e.preventDefault();
          if (modalInstance) modalInstance.show();
        }
      })
      .on("keydown", function (e) {
        const key = e.key || e.keyCode;
        if (
          (key === " " ||
            key === "Spacebar" ||
            key === 32 ||
            key === "Enter" ||
            key === 13) &&
          !$(this).is(":checked")
        ) {
          e.preventDefault();
          if (modalInstance) modalInstance.show();
        }
      });
  }

  bindCheckboxModal("#terminos", terminosModal, terminosModalEl);
  bindCheckboxModal("#datosPersonales", datosModal, datosModalEl);

  function bindOpenModalText() {
    $(".open-modal-text").each(function () {
      const $el = $(this);
      const target = $el.data("target");
      const modalEl = target ? document.querySelector(target) : null;
      const modalInstance = modalEl ? new bootstrap.Modal(modalEl) : null;

      $el.on("pointerdown", function (ev) {
        ev.preventDefault();
        if (modalInstance) modalInstance.show();
      });

      $el.on("keydown", function (ev) {
        const key = ev.key || ev.keyCode;
        if (key === "Enter" || key === 13 || key === " " || key === 32) {
          ev.preventDefault();
          if (modalInstance) modalInstance.show();
        }
      });
    });
  }

  bindOpenModalText();

  $("#aceptoTerminos").on("click", function () {
    $("#terminos").prop("checked", true);
    try {
      document.getElementById("aceptoTerminos").blur();
    } catch (e) {}
    setTimeout(() => {
      $("#terminos").focus();
    }, 10);

    try {
      const inst = bootstrap.Modal.getOrCreateInstance(terminosModalEl);
      if (inst) {
        inst.hide();
        setTimeout(() => {
          if (
            terminosModalEl &&
            (terminosModalEl.classList.contains("show") ||
              getComputedStyle(terminosModalEl).display !== "none")
          ) {
            manualHideModal(terminosModalEl);
          }
        }, 80);
      } else {
        manualHideModal(terminosModalEl);
      }
    } catch (err) {
      manualHideModal(terminosModalEl);
    }
  });

  $("#aceptoDatosPersonales").on("click", function () {
    $("#datosPersonales").prop("checked", true);
    try {
      document.getElementById("aceptoDatosPersonales").blur();
    } catch (e) {}
    setTimeout(() => {
      $("#datosPersonales").focus();
    }, 10);

    try {
      const inst = bootstrap.Modal.getOrCreateInstance(datosModalEl);
      if (inst) {
        inst.hide();
        setTimeout(() => {
          if (
            datosModalEl &&
            (datosModalEl.classList.contains("show") ||
              getComputedStyle(datosModalEl).display !== "none")
          ) {
            manualHideModal(datosModalEl);
          }
        }, 80);
      } else {
        manualHideModal(datosModalEl);
      }
    } catch (err) {
      manualHideModal(datosModalEl);
    }
  });

  function manualHideModal(modalEl) {
    try {
      if (!modalEl) return;

      modalEl.classList.remove("show");
      modalEl.style.display = "none";
      modalEl.setAttribute("aria-hidden", "true");
      modalEl.removeAttribute("aria-modal");
      modalEl.removeAttribute("role");

      document
        .querySelectorAll(".modal-backdrop")
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
      try {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.documentElement.style.overflow = "";
      } catch (e) {}

      try {
        const active = document.activeElement;
        if (active && modalEl.contains(active)) {
          const fallback =
            document.querySelector("#formulario") || document.body;
          if (fallback && typeof fallback.focus === "function") {
            fallback.focus({ preventScroll: true });
          } else {
            active.blur();
          }
        }
      } catch (e) {}
    } catch (err) {}
  }

  function clearFieldErrors() {
    $(".is-invalid").removeClass("is-invalid");
    $(".invalid-feedback[data-generated]").remove();
  }

  function clearFieldError($el) {
    if (!$el || !$el.length) return;
    $el.removeClass("is-invalid");

    if (
      $el.hasClass("form-check-input") ||
      $el.attr("type") === "checkbox" ||
      $el.attr("type") === "radio"
    ) {
      const $container = $el.closest(".form-check");
      $container.find(".invalid-feedback[data-generated]").remove();
      return;
    }

    $el.nextAll(".invalid-feedback[data-generated]").first().remove();
  }

  function showFieldError($el, message) {
    if (!$el || !$el.length) return;
    $el.addClass("is-invalid");

    if (
      $el.hasClass("form-check-input") ||
      $el.attr("type") === "checkbox" ||
      $el.attr("type") === "radio"
    ) {
      const $container = $el.closest(".form-check");
      if ($container.find(".invalid-feedback[data-generated]").length === 0) {
        $container.append(
          `<div class="invalid-feedback d-block" data-generated="1">${message}</div>`
        );
      } else {
        $container.find(".invalid-feedback[data-generated]").text(message);
      }
      return;
    }

    let $fb = $el.nextAll(".invalid-feedback[data-generated]").first();
    if ($fb.length === 0) {
      $fb = $(`<div class="invalid-feedback" data-generated="1"></div>`);
      $el.after($fb);
    }
    $fb.text(message);
  }

  function validateForm() {
    clearFieldErrors();
    const errors = [];

    const map = [
      { sel: "#nombre", label: "Nombre" },
      { sel: "#apellido", label: "Apellido" },
      { sel: "#documento", label: "Documento (CI)" },
      { sel: "#fechaNacimiento", label: "Fecha de Nacimiento" },
      { sel: "#telefono", label: "Teléfono" },
      { sel: "#direccion", label: "Dirección" },
      { sel: "#departamento", label: "Departamento" },
      { sel: "#ciudad", label: "Ciudad" },
      { sel: "#email", label: "Email" },
      { sel: "#mensaje", label: "Mensaje" },
    ];

    map.forEach(({ sel, label }) => {
      const $el = $(sel);
      const val = $el.val();
      if (!val || val.toString().trim() === "" || val === "Elegir") {
        errors.push({ el: $el, msg: `${label} es requerido` });
      }
    });

    const email = $("#email").val().trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 0 && !emailRe.test(email)) {
      errors.push({ el: $("#email"), msg: "Email no válido" });
    }

    const documentoVal = $("#documento").val();
    if (documentoVal && documentoVal.toString().trim() !== "") {
      const docClean = documentoVal.toString().trim();
      if (!/^\d{8}$/.test(docClean)) {
        errors.push({
          el: $("#documento"),
          msg: "Documento debe contener exactamente 8 dígitos",
        });
      }
    }

    const telefonoVal = $("#telefono").val();
    if (telefonoVal && telefonoVal.toString().trim() !== "") {
      const telClean = telefonoVal.toString().trim();
      if (!/^\d+$/.test(telClean)) {
        errors.push({
          el: $("#telefono"),
          msg: "Teléfono sólo debe contener números",
        });
      }
    }

    const ingresosRaw = $("#ingresos").val();
    const ingresosClean = ingresosRaw
      ? ingresosRaw.toString().replace(/\./g, "")
      : "";
    if (
      ingresosClean === null ||
      ingresosClean === "" ||
      isNaN(Number(ingresosClean))
    ) {
      errors.push({
        el: $("#ingresos"),
        msg: "Los Ingresos mensuales son inválidos",
      });
    }

    const situacion = $("#situacionLaboral").val();
    if (!situacion || situacion === "Elegir")
      errors.push({
        el: $("#situacionLaboral"),
        msg: "Seleccione su situación laboral",
      });
    const integrantes = $("#integrantes").val();
    if (!integrantes || integrantes === "Elegir")
      errors.push({
        el: $("#integrantes"),
        msg: "Seleccione la cantidad de integrantes",
      });

    const terminosChecked = $("#terminos").is(":checked");
    const datosChecked = $("#datosPersonales").is(":checked");
    if (!terminosChecked)
      errors.push({
        el: $("#terminos"),
        msg: "Debe aceptar términos y condiciones",
      });
    if (!datosChecked)
      errors.push({
        el: $("#datosPersonales"),
        msg: "Debe aceptar política de datos personales",
      });

    if (errors.length > 0) {
      errors.forEach(({ el, msg }) => {
        showFieldError(el, msg);
      });

      try {
        const first = errors[0].el;
        if (first && first.length) {
          const $focusEl = first.hasClass("form-check-input") ? first : first;
          if ($focusEl && typeof $focusEl.focus === "function") {
            $focusEl.focus();
            $focusEl[0].scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      } catch (e) {}
      return { valid: false, errors };
    }

    return { valid: true };
  }

  $("#formulario").on("submit", function (evento) {
    evento.preventDefault();

    const validation = validateForm();
    if (!validation.valid) {
      mostrarAlerta(
        "No se pudo enviar la solicitud, verifique que todos los campos estén completos",
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
      ingreso_mensual: $("#ingresos").val()
        ? $("#ingresos").val().toString().replace(/\./g, "")
        : "",
      situacion_laboral: $("#situacionLaboral").val(),
      integrantes_familiares: $("#integrantes").val(),
      mensaje: $("#mensaje").val(),
    };

    const $submitBtn = $(this).find('button[type="submit"]');
    $submitBtn.prop("disabled", true);
    mostrarAlerta("Enviando mensaje...", "info");

    $.ajax({
      url: API_USUARIOS + "/socios",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(datos),
      timeout: 15000,
      success: function () {
        mostrarAlerta("Solicitud enviada con éxito", "success");
        $("#formulario")[0].reset();
        $("#terminos").prop("checked", false);
        $("#datosPersonales").prop("checked", false);
      },
      error: function (xhr, textStatus, errorThrown) {
        if (textStatus === "timeout") {
          mostrarAlerta(
            "La solicitud está tomando más tiempo del esperado. Por favor, inténtelo nuevamente.",
            "warning"
          );
        } else if (textStatus === "error" && xhr.status === 0) {
          mostrarAlerta(
            "Problema de conectividad detectado. Verifique su conexión a internet e inténtelo nuevamente.",
            "warning"
          );
        } else if (xhr.status >= 500 && xhr.status < 600) {
          mostrarAlerta(
            "Error temporal del servidor. Por favor, inténtelo nuevamente en unos momentos.",
            "warning"
          );
        } else {
          mostrarAlerta(
            "No se pudo enviar la solicitud, verifique que todos los campos estén completos",
            "danger"
          );
        }
      },
      complete: function () {
        $submitBtn.prop("disabled", false);
      },
    });
  });

  function mostrarMensaje(texto, esError = false) {
    $("#mensaje-landing")
      .text(texto)
      .css("color", esError ? "red" : "green");
  }

  $(document).on("click", 'button[type="submit"]', function (e) {
    const terminos = $("#terminos").is(":checked");
    const datosPersonales = $("#datosPersonales").is(":checked");
    if (!terminos || !datosPersonales) {
      e.preventDefault();
      mostrarAlerta(
        "Para continuar, debe aceptar los términos y condiciones y autorizar el uso de sus datos personales.",
        "danger"
      );
      return false;
    }
    return true;
  });

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  $("#documento, #telefono").on("input", function () {
    const $t = $(this);
    const orig = $t.val() || "";
    const cleaned = orig.replace(/\D+/g, "");
    if (orig !== cleaned) {
      $t.val(cleaned);
    }

    if ($t.attr("id") === "documento") {
      if (cleaned.length === 8) {
        clearFieldError($t);
      } else {
        showFieldError(
          $t,
          "El documento debe contener 8 dígitos sin puntos ni guiones"
        );
      }
    }

    if ($t.attr("id") === "telefono") {
      if (cleaned.length > 0) {
        clearFieldError($t);
      } else {
        showFieldError($t, "Teléfono sólo debe contener números");
      }
    }
  });

  function formatThousands(value) {
    if (!value) return "";
    const onlyDigits = value.toString().replace(/\D+/g, "");
    return onlyDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  $("#ingresos").on("input", function () {
    const $i = $(this);
    const orig = $i.val() || "";
    const cleaned = orig.toString().replace(/\D+/g, "");
    const formatted = formatThousands(cleaned);
    if (formatted !== orig) {
      const pos = this.selectionStart || formatted.length;
      $i.val(formatted);
      try {
        this.setSelectionRange(pos, pos);
      } catch (e) {}
    }
    if (cleaned === "" || isNaN(Number(cleaned))) {
      showFieldError($i, "Ingresos mensuales inválidos");
    } else {
      clearFieldError($i);
    }
  });

  $("#ingresos").on("blur", function () {
    const $i = $(this);
    const cleaned = ($i.val() || "").toString().replace(/\D+/g, "");
    if (cleaned === "" || isNaN(Number(cleaned))) {
      showFieldError($i, "Ingresos mensuales inválidos");
    } else {
      $i.val(formatThousands(cleaned));
      clearFieldError($i);
    }
  });

  $("#email").on("blur input", function () {
    const $e = $(this);
    const val = ($e.val() || "").toString().trim();
    if (val.length === 0) {
      clearFieldError($e);
      return;
    }
    if (!emailRe.test(val)) {
      showFieldError($e, "Email no válido");
    } else {
      clearFieldError($e);
    }
  });

  $("#documento").on("blur", function () {
    const $d = $(this);
    const val = ($d.val() || "").toString().trim();
    if (val.length === 0) {
      clearFieldError($d);
      return;
    }
    if (!/^\d{8}$/.test(val)) {
      showFieldError(
        $d,
        "El documento debe contener 8 dígitos sin puntos ni guiones"
      );
    } else {
      clearFieldError($d);
    }
  });
});
