export class TipoComercio {
  id?: string
  nome?: string
}

export const tiposComercio: TipoComercio[] = [
  { id: 'mercado', nome: 'Mercado' },
  { id: 'farmacia', nome: 'Farmácia' },
  { id: 'outros', nome: 'Outros' }
]