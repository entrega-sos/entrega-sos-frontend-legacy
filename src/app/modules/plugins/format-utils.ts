import { SelectGroupOption } from "./forms/select-group/select-group-option";

export class FormatUtils {
    static dataToDatePicker(data: string): string {
        if (!data) {
            return null;
        } else {
            return data.substr(6, 4) + '-' + data.substr(3, 2) + '-' + data.substr(0, 2);
        }
    }

    static datePickerToData(datePicker: string): string {
        if (!datePicker) {
            return null;
        } else {
            return datePicker.substr(8, 2) + '/' + datePicker.substr(5, 2) + '/' + datePicker.substr(0, 4);
        }
    }

    static formatMoney(valor: number): string {
        if (!valor) {
            valor = 0;
        }

        var formatter = new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });

        const v: string = formatter.format(valor);

        return v;
    }

    static parseMoney(valor: string): number {
        if (valor) {
            try {
                while (valor.indexOf('.') >= 0) {
                    valor = valor.replace('.', '');
                }

                while (valor.indexOf(',') >= 0) {
                    valor = valor.replace(',', '.');
                }

                valor = valor.replace('R', '').replace('$', '');

                let v: number = parseFloat(valor);

                if (isNaN(v)) {
                    v = 0.0;
                }

                return v;
            } catch (err) {
                console.error(err);
            }
        }
        return 0.0;
    }

    /**
     * Preenche uma string com um caractere à esquerda
     * @param source String original
     * @param padWith String a preencher
     * @param length Tamanho total
     */
    static fill(source, padWith, length) {
        if (!source) {
            source = '';
        }
        while (source.toString().length < length) {
            source = padWith + source;
        }
        return source;
    }

    static toOption(itens: SelectGroupOption[]): any[] {
        let result: any[] = [];

        itens.forEach((i) => result.push({ id: i.value, text: i.label }));

        return result;
    }

    /**
     * Retorna o valor de um field
     * @param data Objeto daonde buscar o valor
     * @param field Nome do field a ser buscado
     */
    static resolveFieldValue(data: any, field: string): any {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            } else {
                let fields: string[] = field.split('.');
                let value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    if (value == null) {
                        return null;
                    }
                    value = value[fields[i]];
                }
                return value;
            }
        } else {
            return null;
        }
    }

    /**
     * Substitui os pontos '.' por underline '_'
     * @param nomeAtributo Nome do atributo
     */
    static trataNomeFieldRest(nomeAtributo: string): string {
        if (!nomeAtributo) {
            return '';
        }

        while (nomeAtributo.indexOf('.') >= 0) {
            nomeAtributo = nomeAtributo.replace('.', '_');
        }

        return nomeAtributo;
    }

}
