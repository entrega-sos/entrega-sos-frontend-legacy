import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from "md5-typescript";

@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.component.html',
  styleUrls: ['./voluntarios.component.scss']
})
export class VoluntariosComponent implements OnInit {

  public dados = {
    "parceiros": [
      {
        id: 1,
        nome: 'Giross',
        instagram: 'girossapp',
        foto: 'assets/images/logo-giross.svg',
        email: '',
        linkedin: '',
        github: '',
        twitter: 'giross',
        site: 'http://www.giross.com.br/',
        googlePlay: 'https://play.google.com/store/apps/details?id=com.by4java.giross&hl=pt_BR',
        appleStore: 'https://apps.apple.com/br/app/giross/id1481633932',
        whatsapp: '5577999789680'
      },
      {
        id: 2,
        nome: 'DevFSA',
        instagram: 'devfsa_',
        foto: 'assets/images/foto-devfsa.jpg',
        email: '',
        linkedin: '',
        github: 'devfsa',
        twitter: '',
        site: 'https://devfsa.com.br/',
        telegram: 'devfsa'
      }
    ],
    "voluntarios": [
      {
        id: 1,
        nome: 'Eduardo Daltro',
        ocupacao: 'Idealizador e Desenvolvedor Back-end',
        instagram: 'daltroedu',
        foto: 'assets/images/foto-eduardo.jpg',
        email: '',
        linkedin: 'daltroedu',
        github: 'daltroedu'
      },
      {
        id: 2,
        nome: 'Orlando Burli',
        ocupacao: 'Desenvolvedor Front-end',
        instagram: 'burlijunior',
        foto: '',
        email: 'orlando.burli@gmail.com',
        linkedin: 'orlando-burli-junior',
        github: 'orlandoburli',
        twitter: 'orlandoburli'
      },
      {
        id: 3,
        nome: 'Walter Gandarella',
        ocupacao: 'Desenvolvedor Front-end',
        instagram: 'wgbn',
        foto: '',
        email: '',
        linkedin: '',
        github: ''
      },
      {
        id: 4,
        nome: 'Murilo Barbosa',
        ocupacao: 'Desenvolvedor Front-end',
        instagram: 'murilojava',
        foto: '',
        email: '',
        linkedin: '',
        github: ''
      },
      {
        id: 5,
        nome: 'Nataly Costa',
        ocupacao: 'Designer',
        instagram: 'nataly_costa_design',
        foto: '',
        email: '',
        linkedin: '',
        github: ''
      },
      {
        id: 6,
        nome: 'Odilon Santos',
        ocupacao: 'Advogado',
        instagram: 'odilonssantos',
        foto: '',
        email: '',
        linkedin: '',
        github: ''
      },
      {
        id: 7,
        nome: 'Matheus Rios',
        ocupacao: 'Infraestrutura',
        instagram: 'mattheusriios',
        foto: '',
        email: '',
        linkedin: '',
        github: ''
      }
    ]
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dados.voluntarios.forEach(v => {
      if (!v.foto) {
        if (v.email) {
          v.foto = `https://www.gravatar.com/avatar/${Md5.init(v.email)}`
        } else {
          v.foto = 'assets/images/logo.svg'
        }
      }
    })

    this.dados.parceiros.forEach(v => {
      if (!v.foto) {
        if (v.email) {
          v.foto = `https://www.gravatar.com/avatar/${Md5.init(v.email)}`
        } else {
          v.foto = 'assets/images/logo.svg'
        }
      }
    })
  }

  public getPhoto(a: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(`https://api.github.com/users/${a}`)
        .subscribe(data => {
          resolve(data["avatar_url"]);
        }, (error) => reject(error))
    })
  }
}
