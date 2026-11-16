import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import { converterParaReal } from "./utils";

const colecaoMalibu = [
  {
    id: "malibu-1",
    title: "Anel Sunset Dourado",
    price: 39.9,
    category: "anel",
    description:
      "Anel delicado com pedra rosa, inspirado no pôr do sol de Malibu.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
  },
  {
    id: "malibu-2",
    title: "Brincos Concha Pearl",
    price: 59.9,
    category: "brincos",
    description:
      "Brincos delicados de concha com pérola, perfeitos para o verão.",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop",
  },
  {
    id: "malibu-3",
    title: "Colar Estrela do Mar",
    price: 74.9,
    category: "colar",
    description:
      "Colar delicado com pingente inspirado no mar e no brilho do verão.",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
  },
  {
    id: "malibu-4",
    title: "Pulseira Barbie Charm",
    price: 49.9,
    category: "pulseira",
    description:
      "Pulseira charm com detalhes delicados e inspiração Malibu.",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop",
  },
];

function ProductList({ onComprar, onAviso }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [favoritos, setFavoritos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await axios.get(
          "https://fakestoreapi.com/products/category/jewelery"
        );

        const produtosAPI = resposta.data.map((produto) => ({
          ...produto,
          price: converterParaReal(produto.price),
          category: "jewelery",
          originalCurrency: "BRL",
        }));

        setProducts([...colecaoMalibu, ...produtosAPI]);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setProducts(colecaoMalibu);
        setErro(
          "Não foi possível conectar à API. Exibindo a coleção Malibu."
        );
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, []);

  function adicionarProduto(novoProduto) {
    setProducts((anterior) => [novoProduto, ...anterior]);
    setModalAberto(false);
    onAviso("💎 Nova joia adicionada à vitrine!");
  }

  function alternarFavorito(id) {
    setFavoritos((anterior) =>
      anterior.includes(id)
        ? anterior.filter((item) => item !== id)
        : [...anterior, id]
    );
  }

  const categorias = [
    { valor: "todas", nome: "✨ Todas" },
    { valor: "anel", nome: "Anéis" },
    { valor: "brincos", nome: "Brincos" },
    { valor: "colar", nome: "Colares" },
    { valor: "pulseira", nome: "Pulseiras" },
    { valor: "jewelery", nome: "Joias da API" },
  ];

  const produtosFiltrados = products.filter((produto) => {
    const correspondeBusca = produto.title
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeCategoria =
      categoria === "todas" || produto.category === categoria;

    return correspondeBusca && correspondeCategoria;
  });

  return (
    <section className="vitrine">
      <div className="barra-topo flex flex-wrap justify-content-between align-items-center gap-3">
        <div className="campo-busca flex-1">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Buscar sua joia favorita..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <button
          className="novo-produto-button"
          onClick={() => setModalAberto(true)}
          type="button"
        >
          + Nova joia
        </button>
      </div>

      <div className="filtros flex flex-wrap gap-2">
        {categorias.map((item) => (
          <button
            key={item.valor}
            type="button"
            onClick={() => setCategoria(item.valor)}
            className={categoria === item.valor ? "chip ativo" : "chip"}
          >
            {item.nome}
          </button>
        ))}
      </div>

      <div className="contador">
        {products.length} joia(s) disponíveis
        <span> · {favoritos.length} favorita(s) 💖</span>
      </div>

      {erro && <p className="aviso-api">{erro}</p>}

      {loading ? (
        <div className="carregando">
          <div className="spinner"></div>
          <p>Preparando nossa coleção...</p>
        </div>
      ) : (
        <>
          <div className="grid">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2"
              >
                <ProductCard
                  product={produto}
                  favorito={favoritos.includes(produto.id)}
                  onFavorito={() => alternarFavorito(produto.id)}
                  onComprar={() => onComprar(produto)}
                />
              </div>
            ))}
          </div>

          {produtosFiltrados.length === 0 && (
            <div className="sem-produtos">
              <span>🐚</span>
              <h3>Nenhuma joia encontrada</h3>
              <p>Tente buscar por outro nome ou categoria.</p>
            </div>
          )}
        </>
      )}

      {modalAberto && (
        <div
          className="modal-overlay"
          onClick={() => setModalAberto(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="fechar-modal"
              onClick={() => setModalAberto(false)}
              type="button"
            >
              ×
            </button>

            <h2>Nova joia Malibu 💎</h2>
            <p>Cadastre uma nova peça na nossa coleção.</p>

            <ProductForm
              onAdd={adicionarProduto}
              onCancel={() => setModalAberto(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductList;