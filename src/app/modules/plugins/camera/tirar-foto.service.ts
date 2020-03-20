import { DeviceListService } from './device-list.service';
import { TirarFotoComponent } from './tirar-foto/tirar-foto.component';
import { Injectable, ComponentFactory, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';

declare var $: any;
declare var window: any;

@Injectable()
export class TirarFotoService {

    componentRef: ComponentRef<TirarFotoComponent>;

    constructor(private deviceListService: DeviceListService) {
    }

    tirarFoto(idVideoSource: string): Promise<string> {
        const p: Promise<string> = new Promise(
            (resolve: (fotoBase64: string) => void,
                reject: (mensagem: string) => void) => {

                this.deviceListService.getListDevices().then((devices) => {

                    // Gera um nome randomico
                    let random = Math.random() * 100000;
                    random = Math.round(random);
                    const idModal = 'modalFoto_' + random;

                    let div = '';

                    // Monta a div do modal
                    div += '<div id="' + idModal + '" class="modal fade" tabindex="-1" role="dialog">\n';
                    div += '  <div class="modal-dialog" role="document">\n';
                    div += '    <div class="modal-content">\n';
                    div += '      <div class="modal-header">\n';
                    // tslint:disable-next-line:max-line-length
                    div += '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n';
                    div += '        <h4 class="modal-title">Tirar foto</h4>\n';
                    div += '      </div>\n';
                    div += '      <div class="modal-body">\n';

                    div += '        <div class="form-group">\n';
                    div += '          <label class="col-md-6 control-label">Selecione a câmera para tirar foto</label>\n';
                    div += '          <div class="col-md-6">\n';
                    // tslint:disable-next-line:max-line-length
                    div += '            <select id="selectSource_' + idModal + '" class="selectpicker" data-style="btn-info btn-fill btn-block" data-size="7">\n';

                    devices.forEach(d => {
                        div += '            <option value="' + d.id + '">' + d.label + '</option>\n';
                    });

                    div += '            </select>\n';
                    div += '          </div>\n';
                    div += '        </div>';
                    div += '        <div class="form-group" style="padding-top: 40px;">\n';
                    div += '          <canvas class="img-thumbnail image" id="canvas_' + idModal + '"></canvas>\n';
                    div += '          <video class="img-thumbnail image" id="video_' + idModal + '" autoplay></video>\n';
                    div += '        </div>\n';
                    div += '      </div>\n';
                    div += '      <div class="modal-footer">\n';
                    div += '        <button type="button" class="btn botao-confirmar-foto btn-primary">Confirmar foto</button>\n';
                    div += '        <button type="button" class="btn botao-resetar-foto btn-primary">Tirar foto novamente</button>\n';
                    div += '        <button type="button" class="btn botao-tirar-foto btn-primary">Tirar foto</button>\n';
                    div += '        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\n';
                    div += '      </div>\n';
                    div += '    </div>\n';
                    div += '  </div>\n';
                    div += '  <input type="hidden" id="image_' + idModal + '" />';

                    // Eventos javascript do modal

                    // Function de limpar a foto
                    div += '<script type="text/javascript">\n';
                    div += '    function limparFotoModal() {\n';
                    div += '      $("#' + idModal + '").find(".botao-tirar-foto").show();\n';
                    div += '      $("#' + idModal + '").find(".botao-confirmar-foto").hide();\n';
                    div += '      $("#' + idModal + '").find(".botao-resetar-foto").hide();\n';
                    div += '      $("#image_' + idModal + '").val("");\n';
                    div += '      $("#video_' + idModal + '").show();\n';
                    div += '      $("#canvas_' + idModal + '").hide();\n';
                    div += '      mudarCamera();\n';
                    div += '    }\n';

                    // Function de tirar o snapshot
                    div += '    function tirarFotoModal() {\n';
                    div += '      $("#' + idModal + '").find(".botao-tirar-foto").hide();\n';
                    div += '      $("#' + idModal + '").find(".botao-confirmar-foto").show();\n';
                    div += '      $("#' + idModal + '").find(".botao-resetar-foto").show();\n';
                    div += '      $("#video_' + idModal + '").hide();\n';
                    div += '      $("#canvas_' + idModal + '").show();\n';
                    div += '      var video = $("#video_' + idModal + '")[0];\n';
                    div += '      var canvas = $("#canvas_' + idModal + '")[0];\n';
                    div += '			canvas.width = video.videoWidth;\n';
                    div += '			canvas.height = video.videoHeight;\n';
                    div += '			canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);\n';
                    div += '      stop();\n';

                    // Zera o video
                    div += '      $("#video_' + idModal + '")[0].srcObject = null;\n';
                    div += '    }\n';

                    // Function de stop dos video
                    div += '    function stop() {\n';
                    div += '      if (window.stream) {\n';
                    div += '        window.stream.getTracks().forEach(function(track) {\n';
                    div += '          track.stop();\n';
                    div += '        });\n';
                    div += '      }\n';
                    div += '    }\n';

                    // Function do change camera
                    div += '    function mudarCamera() {\n';
                    div += '      stop();\n';
                    div += '      var videoSource = $("#selectSource_' + idModal + '").val();\n';
                    div += '      var constraints = {\n';
                    div += '        video: {deviceId: videoSource ? {exact: videoSource} : undefined}\n';
                    div += '      };\n';
                    div += '      navigator.mediaDevices.getUserMedia(constraints).\n';
                    div += '          then((stream)=> {\n';

                    // Seta o stream de captura
                    div += '            window.stream = stream;\n';
                    div += '            $("#video_' + idModal + '")[0].srcObject = stream;\n';
                    div += '          }).catch(handleError);\n';
                    div += '      }\n';

                    // Funcao de captura de erro
                    div += '      function handleError(error) {\n';
                    div += '        console.log("navigator.getUserMedia error: ", error);\n';
                    div += '      }\n';

                    // TODO Function de salvar a foto e retornar
                    div += '      function confirmarFoto() {\n';
                    div += '        stop();\n';
                    div += '        var canvas = $("#canvas_' + idModal + '")[0];\n';
                    div += '        $("#image_' + idModal + '").val(canvas.toDataURL("image/jpeg"));\n';
                    div += '        $("#' + idModal + '").modal("hide");\n';
                    div += '      }\n';

                    // Bind dos eventos do botao
                    div += '      $("#' + idModal + '").find(".botao-tirar-foto").on("click", function() { tirarFotoModal() });\n';
                    div += '      $("#' + idModal + '").find(".botao-resetar-foto").on("click", function() { limparFotoModal() });\n';
                    div += '      $("#' + idModal + '").find(".botao-confirmar-foto").on("click", function() { confirmarFoto() });\n';
                    div += '      $("#selectSource_' + idModal + '").on("change", function() { mudarCamera() });\n';

                    if (idVideoSource && idVideoSource !== '') {
                        div += '      $("#selectSource_' + idModal + '").val("' + idVideoSource + '");\n';
                    }

                    // Primeiro load, limpa a foto
                    div += '      limparFotoModal();\n';
                    div += '      mudarCamera();\n';
                    div += '      $("#selectSource_' + idModal + '").selectpicker();\n';

                    div += '</script>\n';
                    div += '</div>\n';

                    $('body').append(div);

                    $('#' + idModal).modal('show');

                    $('#' + idModal).on('hide.bs.modal', function(e) {
                        // Limpa o video
                        $('#video_' + idModal)[0].srcObject = null;

                        // Para todas as fontes de video
                        if (window.stream) {
                            window.stream.getTracks().forEach(function(track) {
                                track.stop();
                            });
                        }

                        // Verifica se foi selecionada alguma foto
                        if ($('#image_' + idModal).val() !== '') {
                            resolve($('#image_' + idModal).val());
                        } else {
                            reject('');
                        }

                        // Apaga o Html gerado
                        $('#' + idModal).remove();
                    });
                }).catch((mensagem) => reject(mensagem));
            }
        );

        return p;
    }

    /**
     * Salva o device para uma determinada tela
     * @param idDevice Id do device a ser salvo
     * @param funcionalidade Nome da funcionalidade
     */
    salvarDeviceFoto(idDevice, funcionalidade) {
        const key = 'foto_' + funcionalidade;
        localStorage.setItem(funcionalidade, key);
    }

    /**
     * Retorna o device
     * @param funcionalidade
     */
    retornarDeviceFoto(funcionalidade) {
        return localStorage.getItem('foto_' + funcionalidade);
    }
}
