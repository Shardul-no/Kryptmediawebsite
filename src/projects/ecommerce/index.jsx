import { useState } from 'react';
import './styles.css';

export default function EcommerceDemo() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const products = [
    { id: 1, name: 'Premium Laptop', price: 1299, category: 'electronics', image: '💻' },
    { id: 2, name: 'Wireless Headphones', price: 199, category: 'electronics', image: '🎧' },
    { id: 3, name: 'Smart Watch', price: 299, category: 'electronics', image: '⌚' },
    { id: 4, name: 'Designer Backpack', price: 89, category: 'fashion', image: '🎒' },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="ecommerce-demo px-8 py-8">
      {/* Store Header */}
      <div className="bg-white rounded-xl p-6 mb-8 border border-teal-500/10">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Tech Store Demo</h2>
          <div className="flex items-center gap-4">
            <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-semibold">
              🛒 {cart.length} items - ${total}
            </span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-8">
        {['all', 'electronics', 'fashion'].map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              activeCategory === category 
                ? 'bg-teal-600 text-white' 
                : 'bg-white text-charcoal hover:bg-teal-50 border border-teal-500/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl p-6 border border-teal-500/10 hover:shadow-lg transition-all">
            <div className="text-4xl text-center mb-4">{product.image}</div>
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <p className="text-2xl font-bold text-teal-600 mb-4">${product.price}</p>
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      {cart.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-teal-500/10">
          <h3 className="text-xl font-bold mb-4">Shopping Cart</h3>
          <div className="space-y-2 mb-4">
            {cart.map(item => (
              <div key={item.cartId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{item.image} {item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">${item.price}</span>
                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-teal-600">${total}</span>
            </div>
            <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
              Checkout (Demo)
            </button>
          </div>
        </div>
      )}

      {/* Extra padding at bottom for better UX */}
      <div className="h-32"></div>
    </div>
  );
}
