class Conta{
    #agencia;
    #conta;
    #saldo;
    chavesPix;

    constructor(agencia, conta, saldo){
        this.#agencia = agencia;
        this.#conta = conta;
        this.#saldo = saldo;
        this.chavesPix = {
            cpf: undefined,
            email: undefined,
            telefone: undefined
        };
    }

    criarConta(agencia, conta, saldo){
        if(agencia.length === 4 && conta.length === 5 && saldo > 0){
            this.#agencia = agencia;
            this.#conta = conta;
            this.#saldo = saldo;
        
            return "Conta criada com sucesso";
        } else {
             throw new Error("Dados inválidos para cadastro");
        }

    }
    sacar(valor){
        if(valor > 0 && typeof valor === "number"){
            if(this.#saldo - valor > 0){
                const saldoAtualizado = this.#saldo - valor;
                this.setSaldo(saldoAtualizado)
            } else {
                throw new Error("Saldo insuficiente")
            }
        } else{
            throw new Error("Valor inválido para saque")
        }
    }

    depositar(valor){
        if(valor > 0 && typeof valor === "number"){
            const saldoAtualizado = this.#saldo + valor;
            this.setSaldo(saldoAtualizado)
        }else{
            throw new Error("Valor inválido para depósito")
        }
    }

    getAgencia(){
        return this.#agencia;
    }

    getConta(){
        return this.#conta;
    }

    getSaldo(){
        return this.#saldo;
    }

    setSaldo(novoSaldo){
        this.#saldo = novoSaldo;
    }

    criarChavePix(chavePix, tipo){
        switch (tipo) {
            case "CPF":
                let regexCPF = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
                if (regexCPF.test(chavePix)) {
                    this.chavesPix.cpf = chavePix;
                    return "Chave Pix por cpf criada com sucesso";
                }else{
                    return ("Erro: CPF inválido");
                }
            case "EMAIL":
                let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (regexEmail.test(chavePix)) {
                    this.chavesPix.email = chavePix;
                    return "Chave Pix por email criada com sucesso";
                }else{
                    return "Erro: Email inválido";
                }
            case "TELEFONE":
                let regexTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
                if (regexTelefone.test(chavePix)) {
                    this.chavesPix.telefone = chavePix;
                    return "Chave Pix por telefone criada com sucesso";
                }else{
                    return "Erro: Telefone inválido";
                }
            default:
                return "Chave inexistente";
                break;
        }
    }
    
}

module.exports = Conta