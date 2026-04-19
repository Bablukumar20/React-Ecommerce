import React from "react";
import { CheckCircle, MapPin, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const OrderConfirmation = ({ deliveryDetails }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-14">
      <div className="bg-[#0d1a33] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* TOP SUCCESS BAR */}
        <div className="bg-green-500/10 border-b border-green-500/20 px-8 py-8 text-center">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />

          <h1 className="text-4xl font-extrabold text-white">
            Order Confirmed
          </h1>

          <p className="text-gray-300 mt-3 text-lg">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          
          {/* LEFT */}
          <div className="bg-[#08111f] rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <MapPin className="text-orange-500 w-5 h-5" />
              <h3 className="text-xl font-bold text-white">
                Delivery Address
              </h3>
            </div>

            <div className="text-gray-300 space-y-2">
              <p className="text-white font-semibold text-lg">
                {deliveryDetails?.name}
              </p>
              <p>{deliveryDetails?.address}</p>
              <p>
                {deliveryDetails?.city}, {deliveryDetails?.zip}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-[#08111f] rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <ShoppingBag className="text-orange-500 w-5 h-5" />
              <h3 className="text-xl font-bold text-white">
                Order Status
              </h3>
            </div>

            <div className="space-y-3 text-gray-300">
              <p>✔ Payment Received</p>
              <p>✔ Order Packed</p>
              <p>⏳ Ready for Dispatch</p>
              <p className="text-green-400 font-semibold">
                Estimated Delivery: 3-5 Days
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="px-8 pb-8">
          <Link
            to="/"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl transition shadow-lg"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;