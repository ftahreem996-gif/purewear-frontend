import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { IProduct } from '../types';

interface WishlistContextType {
  wishlist: IProduct[];
  addToWishlist: (product: IProduct) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<IProduct[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const saveWishlist = (newWishlist: IProduct[]) => {
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const addToWishlist = (product: IProduct) => {
    if (!wishlist.find((p) => p._id === product._id)) {
      saveWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id: string) => {
    saveWishlist(wishlist.filter((p) => p._id !== id));
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((p) => p._id === id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};