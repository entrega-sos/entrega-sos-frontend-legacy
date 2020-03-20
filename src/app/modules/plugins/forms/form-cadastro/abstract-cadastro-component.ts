import { Observable } from 'rxjs';
import { SpringDataRestService } from './../../../geral/services/spring-data-rest.service';
import { BlockUiService } from './../../../plugins/block-ui/block-ui.service';
import { Utils } from './../../../plugins/shared';
import { MensagemService } from './../../../plugins/forms/mensagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dados } from 'src/app/modules/geral/model/dados.model';

declare var $: any;

export abstract class AbstractCadastroComponent<T> implements OnInit, AfterViewInit, OnDestroy {


  @Input() public vo: T;

  public inscricoes: Subscription[] = [];

  @Input() public acao: string;

  public id: any;

  dados: Dados = {};

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _blockService: BlockUiService,
    private _msg: MensagemService,
    private _rest: SpringDataRestService
  ) {
    this.vo = this.getVoNewInstance();
  }

  ngOnInit() {
    this.bloquear();

    const s = this._route.params.subscribe((params: any[]) => {
      this.id = params['id'];
      this.acao = params['acao'];

      if (this.id) {
        const s2 = this._rest.get<T>(this.id, {
          entity: this.getEntityName()
        }).subscribe((retorno) => {
          this.beforeVisualizar(retorno);

          this.vo = retorno;

          this.afterVisualizar(this.vo);

          this.desbloquear();
        }, (error) => {
          this.desbloquear();
        });
        this.inscricoes.push(s2);
      } else {
        this.vo = this.getVoNewInstance();
        this.beforeVisualizar(this.vo);
        this.afterVisualizar(this.vo);

        this.desbloquear();
      }
    });
    this.inscricoes.push(s);
  }

  public bloquear() {
    this._blockService.block('#panel-cadastro, #internal_panel-cadastro');
  }

  public desbloquear() {
    this._blockService.unBlock('#panel-cadastro, #internal_panel-cadastro');
  }

  ngAfterViewInit() {
    if (!this.isDesabilitar()) {
      // TODO Pegar o primeiro input
      $('#internal_nome').focus();
    } else {
      $('botao-excluir').focus();
    }
  }

  beforeVisualizar(vo: T) {
    //
  }

  afterVisualizar(vo: T) {
    //
  }

  beforeSalvar(vo: T): boolean {
    return true;
  }

  isExcluir() {
    return this.isDesabilitar();
  }

  isNovo() {
    return this.acao && this.acao === 'novo';
  }

  isDesabilitar() {
    return this.acao && (this.acao === 'excluir' || this.acao === 'visualizar');
  }

  /**
   * Retorna uma instancia vazia do VO
   */
  abstract getVoNewInstance(): T;

  /**
   * Retorna o nome da entidade
   */
  abstract getEntityName(): string;

  aplicar() {
    this.bloquear();
    this.salvar(false, true, () => this.aplicarPosSave());
  }

  aplicarPosSave(): Observable<boolean> {
    return new Observable(observer => {
      if (this.isNovo()) {
        // Redireciona pra edição
        // this._router.navigate([this._route.parent.routeConfig.path]);
        this._router.navigate([this._route.parent.routeConfig.path, 'editar', this.vo['id']]);
      } else {
        this.desbloquear();
      }

      observer.next(true);
      observer.complete();

    });
  }

  salvar(voltar: boolean = true, showSuccessMessage: boolean = true, callbackSuccess: () => Observable<boolean>) {
    if (!this.beforeSalvar(this.vo)) {
      return;
    }

    this.bloquear();

    if (this.id && this.acao === 'editar') {
      const s: Subscription = this._rest.update(this.vo, this.id, { entity: this.getEntityName() })
        .subscribe((retorno) => {

          this.vo = retorno

          if (callbackSuccess) {
            callbackSuccess().subscribe((retorno) => { },
              (err) => { this._msg.nofiticationError('Ocorreu um erro ao persistir os relacionamentos: ' + err.toString()) },
              () => {
                this.beforeVisualizar(this.vo);

                this.afterVisualizar(this.vo);

                if (showSuccessMessage) {
                  this._msg.nofiticationInfo('Registro alterado com sucesso!');
                }
                if (voltar) {
                  this.voltar();
                }
                this.desbloquear();

              });
          } else {
            this.beforeVisualizar(this.vo);

            this.afterVisualizar(this.vo);

            if (showSuccessMessage) {
              this._msg.nofiticationInfo('Registro alterado com sucesso!');
            }
            if (voltar) {
              this.voltar();
            }
            this.desbloquear();

          }

        }, (errorResponse) => {
          this.desbloquear();

          if (!this.isAccessError(errorResponse)) {
            this._msg.warn(Utils.buildErrorMessage(errorResponse.error)).then(() => {
              $(this.getFieldName(Utils.getFirstFieldError(errorResponse.error))).focus();
            });
          }
        });

      this.inscricoes.push(s);

    } else if (this.acao === 'novo') {
      const s: Subscription = this._rest.insert(this.vo, { entity: this.getEntityName() })
        .subscribe((retorno) => {
          this.vo = retorno;

          if (callbackSuccess) {
            callbackSuccess().subscribe((retorno) => { },
              (err) => { this._msg.nofiticationError('Ocorreu um erro ao persistir os relacionamentos: ' + err.toString()) },
              () => {
                this.beforeVisualizar(this.vo);

                this.afterVisualizar(this.vo);

                if (showSuccessMessage) {
                  this._msg.nofiticationInfo('Registro incluído com sucesso!');
                }
                if (voltar) {
                  this.voltar();
                } else {
                  // Se nao vai voltar, tem que redirecionar para edicao
                  let vo: any = this.vo;
                  this._router.navigate([this._route.parent.routeConfig.path, 'editar', vo.id]);
                }
                this.desbloquear();

              });
          } else {
            this.beforeVisualizar(this.vo);

            this.afterVisualizar(this.vo);

            if (showSuccessMessage) {
              this._msg.nofiticationInfo('Registro incluído com sucesso!');
            }
            if (voltar) {
              this.voltar();
            } else {
              // Se nao vai voltar, tem que redirecionar para edicao
              let vo: any = this.vo;
              this._router.navigate([this._route.parent.routeConfig.path, 'editar', vo.id]);
            }
            this.desbloquear();
          }
        }, (errorResponse) => {
          this.desbloquear();

          if (!this.isAccessError(errorResponse)) {
            this._msg.warn(Utils.buildErrorMessage(errorResponse.error)).then(() => {
              $(this.getFieldName(Utils.getFirstFieldError(errorResponse.error))).focus();
            });
          }
        });
      this.inscricoes.push(s);
    }
  }

  excluir() {
    this._msg.confirm('Confirma a EXCLUSÃO deste registro?').then((result) => {
      if (result.value) {
        const s: Subscription = this._rest.delete(this.id, { entity: this.getEntityName() }).subscribe((retorno) => {
          this._msg.nofiticationInfo('Registro excluído com sucesso!');
          this.voltar();
        }, (errorResponse) => {
          if (!this.isAccessError(errorResponse)) {
            this._msg.error(Utils.buildErrorMessage(errorResponse.error)).then(() => {
              $(this.getFieldName(Utils.getFirstFieldError(errorResponse.error))).focus();
            });
          }
        });
        this.inscricoes.push(s);
      }
    }).catch(() => {
      // Do nothing.
    });
  }

  voltar() {
    this._router.navigate([this._route.parent.routeConfig.path]);
  }

  ngOnDestroy() {
    this.inscricoes.forEach((s) => s.unsubscribe());
  }

  getFieldName(fieldName: string): any {
    if (fieldName) {
      return '#internal_' + fieldName.replace('.', '_');
    } else {
      return '#any';
    }
  }

  isAccessError(err): boolean {
    if (err && err.status) {
      if (err.status === 401 || err.status === 403 || err.status === 407) {
        return true;
      }
    }
    return false;
  }

  /**
   * Metodo para fazer a comparação de objetos do spring data rest nos selects
  **/
  genericComparator(item1: any, item2: any): boolean {
    return Utils.simpleIdResourceComparator(item1, item2);
  }

  /**
   * Realiza o load de dados auxiliares para o cadastro
   */
  loadDados(): Observable<Dados> {
    return new Observable<Dados>(observer => {
      this.inscricoes.push(
        this._rest
          .dados({ entity: this.getEntityName() })
          .subscribe(dados => {
            this.dados = dados;
            observer.next(dados);
          }, error => observer.error(error))
      );
    });
  }

  load() {
    this.inscricoes.push(
      this._rest
        .dados({ entity: this.getEntityName() })
        .subscribe(dados => {
          this.dados = dados
        })
    );
  }
}
