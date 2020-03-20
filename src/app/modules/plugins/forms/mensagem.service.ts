import { Injectable } from "@angular/core";
import Swal from 'sweetalert2'

declare var $: any;

@Injectable()
export class MensagemService {
  private defaultTimerNotification: number = 2000;

  constructor() { }

  confirm(message: string, title: string = "Confirmação") {
    return Swal.fire({
      html: message,
      title: title,
      text: message,
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    });
  }

  confirmSimNao(message: string, title: string = "Confirmação") {
    return Swal.fire({
      html: message,
      title: title,
      text: message,
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não"
    });
  }

  success(message: string, title: string = "Sucesso") {
    return Swal.fire({
      title: title,
      text: message,
      // buttonsStyling: false,
      // confirmButtonClass: "btn btn-success btn-fill",
      icon: "success"
    });
  }

  askPassword(message: string, title: string = "Informar senha") {
    return Swal.fire({
      html: message,
      title: title,
      text: message,
      input: 'password',
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    });
  }

  askText(message: string, title: string) {
    return Swal.fire({
      html: message,
      title: title,
      text: message,
      input: 'textarea',
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    });
  }

  error(message: string, title: string = "Erro") {
    return Swal.fire(title, message, 'error');
  }

  warn(message: string, title: string = "Alerta") {
    return Swal.fire(title, message, 'warning');
  }

  info(message: string, title: string = "Informação") {
    return Swal.fire(title, message, 'info');
  }

  nofiticationSucess(
    message: string,
    timer: number = this.defaultTimerNotification
  ) {
    $.notify(
      {
        icon: "ti-check",
        message: "<p><strong>Sucesso</strong></p>" + message
      },
      {
        type: "success",
        timer: timer,
        placement: {
          from: "top",
          align: "right"
        }
      }
    );
  }

  nofiticationError(
    message: string,
    timer: number = this.defaultTimerNotification
  ) {
    $.notify(
      {
        icon: "ti-na",
        message: "<p><strong>Erro</strong></p>" + message
      },
      {
        type: "danger",
        timer: timer,
        placement: {
          from: "top",
          align: "right"
        }
      }
    );
  }

  nofiticationWarning(
    message: string,
    timer: number = this.defaultTimerNotification
  ) {
    $.notify(
      {
        icon: "ti-alert",
        message: "<p><strong>Alerta</strong></p>" + message
      },
      {
        type: "warning",
        timer: timer,
        placement: {
          from: "top",
          align: "right"
        }
      }
    );
  }

  nofiticationInfo(
    message: string,
    timer: number = this.defaultTimerNotification,
    title: string = "Informação"
  ) {
    $.notify(
      {
        icon: "ti-info-alt",
        message: "<p><strong>" + title + "</strong></p>" + message
      },
      {
        type: "info",
        timer: timer,
        placement: {
          from: "top",
          align: "right"
        }
      }
    );
  }
}
