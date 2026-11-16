
import { useState } from "react";

import ProductList from "./components/ProductList";
import { formatarMoeda } from "./components/utils";
import "./App.css";

function App() {
  const [sacola, setSacola] = useState([]);
  const [sacolaAberta, setSacolaAberta] = useState(false);
  const [notificacao, setNotificacao] = useState("");

  function avisar(mensagem) {
    setNotificacao(mensagem);

    setTimeout(() => {
      setNotificacao("");
    }, 2500);
  }

  function adicionarAoCarrinho(produto) {
    setSacola((anterior) => {
      const existente = anterior.find(
        (item) => item.id === produto.id
      );

      if (existente) {
        return anterior.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...anterior, { ...produto, quantidade: 1 }];
    });

    avisar("💖 Joia adicionada à sua sacola!");
  }

  function alterarQuantidade(id, valor) {
    setSacola((anterior) =>
      anterior
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade + valor }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function removerProduto(id) {
    setSacola((anterior) =>
      anterior.filter((item) => item.id !== id)
    );

    avisar("Produto removido da sacola.");
  }

  const quantidadeTotal = sacola.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const subtotal = sacola.reduce(
    (total, item) => total + item.price * item.quantidade,
    0
  );

  function finalizarPedido() {
    avisar("Pedido demonstrativo finalizado! 💗");
    setSacola([]);
    setSacolaAberta(false);
  }

  return (
    <div className="app">
      {notificacao && (
        <div className="notificacao">
          {notificacao}
        </div>
      )}

      <div className="faixa">
        ☀️ MALIBU VIBES ✦ FRETE GRÁTIS ACIMA DE R$ 100
        ✦ BRILHO DE PRAIA 🌴 ✦ ATITUDE DE BARBIE 💗
      </div>

      <header className="loja-header">
        <div>
          <h1 className="logo">Malibu Jewels</h1>
          <p className="logo-sub">
            by Lari ✦ joias com brilho de verão
          </p>
        </div>

        <button
          className="carrinho"
          onClick={() => setSacolaAberta(true)}
          type="button"
          aria-label="Abrir sacola"
        >
          🛍️
          <span className="carrinho-badge">
            {quantidadeTotal}
          </span>
        </button>
      </header>

      <section className="hero">
        <div className="sol"></div>

        <div className="hero-content">
          <span className="hero-tag">MALIBU COLLECTION</span>
          <h2>Coleção Pôr do Sol 🌅</h2>
          <p>
            Colares, anéis e brincos para brilhar da praia à balada.
          </p>
          <a href="#vitrine" className="hero-button">
            Descobrir coleção
          </a>
        </div>
      </section>

      <main className="loja-main" id="vitrine">
        <div className="titulo-vitrine">
          <span>NOSSOS FAVORITOS</span>
          <h2>Encontre sua próxima joia ✨</h2>
          <p>Um toque de brilho para todos os seus momentos.</p>
        </div>

        <ProductList
          onComprar={adicionarAoCarrinho}
          onAviso={avisar}
        />
      </main>

      <footer className="loja-footer">
        <h2>Malibu Jewels</h2>
        <p>by Lari · Seu verão merece esse brilho. 💗</p>
        <span>Projeto acadêmico demonstrativo · 2026</span>
      </footer>

      {sacolaAberta && (
        <div
          className="sacola-overlay"
          onClick={() => setSacolaAberta(false)}
        >
          <aside
            className="sacola-painel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sacola-header">
              <div>
                <h2>Minha sacola 💗</h2>
                <p>{quantidadeTotal} item(ns)</p>
              </div>

              <button
                className="fechar-sacola"
                onClick={() => setSacolaAberta(false)}
                type="button"
              >
                ×
              </button>
            </div>

            {sacola.length === 0 ? (
              <div className="sacola-vazia">
                <span>🛍️</span>
                <h3>Sua sacola está vazia!</h3>
                <p>Escolha suas joias favoritas e venha brilhar.</p>

                <button
                  className="novo-produto-button"
                  onClick={() => setSacolaAberta(false)}
                  type="button"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              <>
                <div className="lista-sacola">
                  {sacola.map((produto) => (
                    <div className="item-sacola" key={produto.id}>
                      <img
                        src={produto.image}
                        alt={produto.title}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/200x200/ffe1ef/c21870?text=Joia";
                        }}
                      />

                      <div className="sacola-info">
                        <h3>{produto.title}</h3>

                        <strong>
                          {formatarMoeda(produto.price)}
                        </strong>

                        <div className="quantidade-controle">
                          <button
                            onClick={() =>
                              alterarQuantidade(produto.id, -1)
                            }
                            type="button"
                          >
                            −
                          </button>

                          <span>{produto.quantidade}</span>

                          <button
                            onClick={() =>
                              alterarQuantidade(produto.id, 1)
                            }
                            type="button"
                          >
                            +
                          </button>

                          <button
                            className="remover"
                            onClick={() =>
                              removerProduto(produto.id)
                            }
                            type="button"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sacola-resumo">
                  <div>
                    <span>Subtotal</span>
                    <strong>{formatarMoeda(subtotal)}</strong>
                  </div>

                  <p>
                    Frete não incluído. Finalização demonstrativa,
                    sem pagamento real.
                  </p>

                  <button
                    className="finalizar-button"
                    onClick={finalizarPedido}
                    type="button"
                  >
                    Finalizar pedido 💖
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
