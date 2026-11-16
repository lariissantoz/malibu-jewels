
import { useState } from "react";

function ProductForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "anel",
    description: "",
    image: "",
  });

  const [erro, setErro] = useState("");

  function atualizarCampo(e) {
    const { name, value } = e.target;

    setForm((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function enviarFormulario(e) {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.price ||
      !form.description.trim()
    ) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (Number(form.price) <= 0) {
      setErro("Informe um preço maior que zero.");
      return;
    }

    const novoProduto = {
      ...form,
      id: `novo-${Date.now()}`,
      price: Number(form.price),
      image:
        form.image.trim() ||
        "https://placehold.co/500x500/ffe1ef/c21870?text=Malibu+Jewels",
    };

    onAdd(novoProduto);
  }

  return (
    <form className="product-form" onSubmit={enviarFormulario}>
      <label>Nome da joia *</label>
      <input
        name="title"
        value={form.title}
        onChange={atualizarCampo}
        placeholder="Ex.: Colar Pérola Malibu"
      />

      <label>Preço em reais (R$) *</label>
      <input
        name="price"
        type="number"
        min="0.01"
        step="0.01"
        value={form.price}
        onChange={atualizarCampo}
        placeholder="Ex.: 89,90"
      />

      <label>Categoria *</label>
      <select
        name="category"
        value={form.category}
        onChange={atualizarCampo}
      >
        <option value="anel">Anel</option>
        <option value="brincos">Brincos</option>
        <option value="colar">Colar</option>
        <option value="pulseira">Pulseira</option>
        <option value="jewelery">Joias</option>
      </select>

      <label>Descrição *</label>
      <textarea
        name="description"
        value={form.description}
        onChange={atualizarCampo}
        placeholder="Descreva sua joia..."
        rows="3"
      />

      <label>Link da imagem (opcional)</label>
      <input
        name="image"
        value={form.image}
        onChange={atualizarCampo}
        placeholder="https://..."
      />

      {erro && <p className="form-error">{erro}</p>}

      <div className="form-buttons">
        <button type="submit" className="buy-button">
          Cadastrar joia 💖
        </button>

        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
