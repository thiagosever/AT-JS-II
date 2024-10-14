let pedidos = [];
let codigoPedido = 1;
let codigoProdutoGlobal = 1;

class Pedido {
  constructor(codigo, cliente) {
    this.cliente = cliente;
    this.produtos = [];
    this.codigo = codigo;
    this.status = "Pedido iniciado";
  }

  incluirPedido() {
    pedidos.push(this);
    codigoPedido += 1;
  }

  toString() {
    let listaProdutos = this.produtos
      .map(produto => produto.toString())
      .join("\n");
    return `[${this.status}] Pedido ${
      this.codigo
    } - Cliente: ${this.cliente.toString()}\n Produtos:\n ${listaProdutos}`;
  }

  alterarStatus(novoStatus) {
    this.status = novoStatus;
  }

  adicionarProdutoAoPedido(produto) {
    this.produtos.push(produto);
  }

  removeProduto(codigoProduto) {
    const index = this.produtos.findIndex(
      produto => produto.codigo == codigoProduto
    );

    if (index != -1) {
      const produtoExcluido = this.produtos.splice(index, 1)[0];
      console.log(`${produtoExcluido.nome} excluído!`);
    } else {
      console.log("Produto não identificado");
    }
  }
}

class Produto {
  constructor(codigo, nome, preco, qtd) {
    this.codigo = codigo;
    this.nome = nome;
    this.preco = preco;
    this.qtd = qtd;
  }

  toString() {
    return `${this.nome} - Preço: R$ ${this.preco.toFixed(2)} - Quantidade: ${
      this.qtd
    }`;
  }
}

class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }

  static criarCliente() {
    const nome = prompt("Informe o nome do cliente:");
    const email = prompt("Informe o email do cliente");
    return new Cliente(nome, email);
  }

  toString() {
    return `${this.nome} (${this.email})`;
  }
}

function adicionarProdutos(pedido) {
  let continua = true;

  while (continua) {
    const codigo = codigoProdutoGlobal;
    const nome = prompt("Informe o nome do produto:");
    const preco = parseFloat(prompt("Informe o preço do produto:"));
    const qtd = parseInt(prompt("Informe a quantidade de produto adquirida:"));

    const oProduto = new Produto(codigo, nome, preco, qtd);
    codigoProdutoGlobal += 1;
    pedido.adicionarProdutoAoPedido(oProduto);

    const continuar = prompt(
      `Deseja adicionar mais algum produto?\n1 - Sim\n2 - Não`
    );
    switch (continuar) {
      case "1":
        break;
      case "2":
        continua = false;
        break;
      default:
        alert("Digite um valor válido!");
    }
  }

  pedido.incluirPedido();
  if (confirm("Deseja incluir mais algum pedido?")) {
    coletarDadosPedido();
  } else {
    exibirPedidos();
  }
}

function coletarDadosPedido() {
  const cliente = Cliente.criarCliente();
  const codigo = codigoPedido;
  const pedido = new Pedido(codigo, cliente);
  adicionarProdutos(pedido);
}

function exibirPedidos() {
  let listaPedidos = "";
  for (let item of pedidos) {
    listaPedidos += item.toString() + "\n\n";
  }

  console.log(`Lista de Pedidos: \n${listaPedidos}`);
}

function gerarDadosAleatorios() {
  const nomesClientes = ["Matheus", "Airton", "Lucas", "Elberth", "Thiago"];
  const emailsClientes = [
    "kondizilla@gmail.com",
    "arue@hotmail.com",
    "sonic@yahoo.com",
    "alemao@live.com",
    "zikadopantano@icloud.com",
  ];
  const nomesProdutos = [
    "Notebook",
    "Celular",
    "Tablet",
    "Monitor",
    "Teclado",
    "Mouse",
    "Headset",
  ];

  for (let i = 0; i < 5; i++) {
    const nomeAleatorio =
      nomesClientes[Math.floor(Math.random() * nomesClientes.length)];
    const emailAleatorio =
      emailsClientes[Math.floor(Math.random() * emailsClientes.length)];
    const clienteAleatorio = new Cliente(nomeAleatorio, emailAleatorio);

    const codigo = codigoPedido;
    const novoPedido = new Pedido(codigo, clienteAleatorio);

    const numeroProdutos = Math.floor(Math.random() * 5) + 1;
    for (let j = 0; j < numeroProdutos; j++) {
      const nomeProduto =
        nomesProdutos[Math.floor(Math.random() * nomesProdutos.length)];
      const precoAleatorio = Math.random() * 1000;
      const quantidadeAleatoria = Math.floor(Math.random() * 10) + 1;
      const produto = new Produto(
        j + 1,
        nomeProduto,
        precoAleatorio,
        quantidadeAleatoria
      );
      novoPedido.adicionarProdutoAoPedido(produto);
    }

    novoPedido.incluirPedido();
  }
}

function buscarPedidoPorCodigo(codigoPedido) {
  const codigo = parseInt(codigoPedido);
  return pedidos.find(pedido => pedido.codigo === codigo);
}

function excluirProduto() {
  const pedidoProdExcluido = buscarPedidoPorCodigo(
    prompt("Informe o codigo do pedido o qual o produto será excluído")
  );
  console.log(pedidoProdExcluido);
  if (pedidoProdExcluido) {
    pedidoProdExcluido.removeProduto(
      prompt("Código do produto para exclusão:")
    );
  } else {
    console.log("Pedido não encontrado");
  }
  exibirPedidos();
}

function alterarStatusPedido() {
  let codigoPedido = prompt("Código do pedido para alteração do status:");
  codigoPedido = parseInt(codigoPedido);

  if (!codigoPedido) {
    console.log("Código do pedido não informado.");
    return;
  }

  const pedidoParaAlterarStatus = buscarPedidoPorCodigo(codigoPedido);

  if (!pedidoParaAlterarStatus) {
    console.log(`Pedido com código ${codigoPedido} não encontrado.`);
    return;
  }

  console.log(pedidoParaAlterarStatus);

  let continua = true;
  let valorAlteracao = "";

  do {
    valorAlteracao = prompt(
      `Informe qual status do pedido a ser alterado:\n1 - Iniciado\n2 - Em andamento\n3 - Finalizado`
    );
    switch (valorAlteracao) {
      case "1":
        valorAlteracao = "Iniciado";
        continua = false;
        break;
      case "2":
        valorAlteracao = "Em andamento";
        continua = false;
        break;
      case "3":
        valorAlteracao = "Finalizado";
        continua = false;
        break;
      default:
        console.log("Digite um valor válido");
    }
  } while (continua);

  pedidoParaAlterarStatus.alterarStatus(valorAlteracao);

  exibirPedidos();
}

function exibirValorTotal(osPedidos) {
  osPedidos.forEach(pedido => {
    let valorTotal = pedido.produtos.reduce((total, produto) => {
      const precoProduto = parseFloat(produto.preco);
      return total + (isNaN(precoProduto) ? 0 : precoProduto);
    }, 0);

    valorTotal = Math.floor(valorTotal);

    console.log(`Código do Pedido: ${pedido.codigo}`);
    console.log(`Quantidade de Produtos: ${pedido.produtos.length}`);
    console.log(`Valor Total: R$ ${valorTotal}`);
  });
}

function exibirFiltragem(osPedidos) {
  const pedidosFiltrados = osPedidos.filter(
    pedido => pedido.produtos.length >= 3
  );
  console.log(
    "Filtro - Pedido com mais de três produtos: " +
      JSON.stringify(pedidosFiltrados, null, 2)
  );
}

function exibirErro(pedidos) {
  pedidos.forEach(pedido => {
    let temErro = false;

    pedido.produtos.forEach(produto => {
      if (
        !produto.nome ||
        produto.nome.trim() === "" ||
        produto.nome === null
      ) {
        console.log(
          `Erro: O produto no pedido ${pedido.codigo} está sem nome.`
        );
        temErro = true;
      }

      if (isNaN(produto.preco) || produto.preco <= 0) {
        console.log(
          `Erro: O produto "${produto.nome || "Sem Nome"}" no pedido ${
            pedido.codigo
          } está com preço inválido.`
        );
        temErro = true;
      }

      if (isNaN(produto.qtd) || produto.qtd <= 0) {
        console.log(
          `Erro: O produto "${produto.nome || "Sem Nome"}" no pedido ${
            pedido.codigo
          } está com quantidade inválida.`
        );
        temErro = true;
      }
    });

    if (!temErro) {
      console.log(`O pedido ${pedido.codigo} está correto.`);
    }
  });
}

gerarDadosAleatorios();

coletarDadosPedido();

alterarStatusPedido();

excluirProduto();

exibirValorTotal(pedidos);

exibirFiltragem(pedidos);

exibirErro(pedidos);
