export class Comerciante {
  id?: string;
  descricao?: string;
  usuario?: string;
  email?: string;
  telefone?: string;
  whatsapp?: string;
  senha?: string;
  cep?: string;
  endereco?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  tipo_negocio?: string;
  meio_pagamento?: string[];
  dias_horarios?: string;
  delivery?: boolean;
  instagram?: string;
  facebook?: string;
  site?: string;
  obs?: string;
}

export class Municipo {
  nome?: string
  bairros?: Bairro[]
}

export class Bairro {
  nome?: string
  comerciantes?: Comerciante[]
}

export class ComercianteResult {
  _meta?: Meta;
  _links?: Links;
  items?: Comerciante[];
}

export class Meta {
  page?: number;
  per_page?: number;
  total_pages?: number;
  total_itens?: number;
}

export class Links {
  self?: string;
  next?: string;
  prev?: string;
}