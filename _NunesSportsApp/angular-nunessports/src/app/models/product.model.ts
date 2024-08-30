export class Product {
    id: number | null;
    codigo: string | null;
    nome: string | null;
    descricao: string | null;
    preco: number | null;

    // Construtor principal com parâmetros opcionais
    constructor(id: number | null = null, codigo: string | null = null, nome: string | null = null, descricao: string | null = null, preco: number | null = null) {
        this.id = id;
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
    }
}
