import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import OrderConfimation from "./OrderConfirmation";
import { MapPin, CreditCard, ShieldCheck } from "lucide-react";

const Checkout = () => {
  const { cartTotal, clearCart, cart } = useCart();

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setIsConfirmed(true);
  };

  if (isConfirmed)
    return <OrderConfimation deliveryDetails={deliveryDetails} />;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* TITLE */}
      <div className="mb-10">
        <p className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
          Secure Checkout
        </p>

        <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2">
          Finalize Your Order
        </h2>

        <p className="text-gray-400 mt-2">
          Complete your shipping details and place order safely.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="xl:col-span-2">
          <div className="bg-[#0d1a33] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <MapPin className="text-orange-500 w-6 h-6" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  Shipping Details
                </h3>
                <p className="text-gray-400 text-sm">
                  Enter delivery information
                </p>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {Object.keys(deliveryDetails).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                    {key === "zip" ? "Pin Code" : key}
                  </label>

                  <input
                    type={key === "zip" ? "number" : "text"}
                    name={key}
                    value={deliveryDetails[key]}
                    onChange={handleChange}
                    required
                    placeholder={`Enter ${key}`}
                    className="w-full px-5 py-4 bg-[#08111f] border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-2xl transition shadow-lg flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Pay ₹{cartTotal.toLocaleString()}
              </button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                100% Secure Payment
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className="bg-[#0d1a33] border border-white/10 rounded-3xl p-6 shadow-xl sticky top-24">
            <h3 className="text-2xl font-bold text-white mb-6">
              Order Summary
            </h3>

            {/* ITEMS */}
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 border-b border-white/5 pb-4"
                >
                  <div>
                    <p className="text-white font-medium line-clamp-1">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-orange-500 font-semibold whitespace-nowrap">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>

              <div className="flex justify-between text-xl font-bold">
                <span className="text-white">Total</span>
                <span className="text-orange-500">
                  ₹{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;