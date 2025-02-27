import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React, { useState } from "react";
import { fetchProducts, setPage } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading, currentPage, error } = useSelector((state: RootState) => state.products);
  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const filteredItems = items.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <p className="text-center text-gray-500 mt-8">Chargement...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">Erreur : {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Liste des Produits</h1>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un produit..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-1/2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredItems.length > 0 ? (
          filteredItems.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative">
              <div className="absolute top-4 right-4">
                <WishlistButton product={product} />
              </div>

              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">Prix : {product.price} EUR</p>
              <p className="text-gray-500 text-sm mb-4">Catégorie : {product.category}</p>
              <Link
                to={`/products/${product.id}`}
                className="text-blue-500 underline hover:text-blue-700 mb-4 block"
              >
                Voir le produit
              </Link>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
              >
                Ajouter au panier
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">Aucun produit trouvé</p>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProductList;
