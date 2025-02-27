import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";
import { Heart, HeartOff } from "lucide-react";
import { Product } from "../store/productSlice";
import { RootState } from "../store/store";

interface WishlistButtonProps {
  product: Product;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <button onClick={toggleWishlist} className="text-red-500 hover:text-red-700 transition">
      {isInWishlist ? <Heart className="w-6 h-6" /> : <HeartOff className="w-6 h-6" />}
    </button>
  );
};

export default WishlistButton;
