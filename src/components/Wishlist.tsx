import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeFromWishlist } from "../store/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  console.log(wishlistItems);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Ma Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">Aucun produit dans la wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-gray-500">{item.category}</p>
              <p className="text-red-600 font-semibold mt-2">{item.price} EUR</p>

              <button
                onClick={() => dispatch(removeFromWishlist(item))}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Retirer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
