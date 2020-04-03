export interface TipoComercio {
  id: string;
  nome: string;
  check: boolean;
}

export const tiposComercio: TipoComercio[] = [
  {id: 'mercado', nome: 'Mercado', check: true},
  {id: 'mercearia', nome: 'Mercearia', check: true},
  {id: 'padaria', nome: 'Padaria', check: true},
  {id: 'farmacia', nome: 'Farmácia', check: true},
  {id: 'armarinho', nome: 'Armarinho', check: true},
  {id: 'lanchonete', nome: 'Lanchonete', check: true},
  {id: 'restaurante', nome: 'Restaurante', check: true},
  {id: 'veterinario', nome: 'Veterinário', check: true},
];
