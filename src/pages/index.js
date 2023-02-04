import { useState, useEffect } from "react";
import Head from "next/head";
import { MenuProvider } from "@/context/menuContext";
import HomeCard from "@/components/HomeCard";
import CartModal from "@/components/Cart";
import OrderModal from "@/components/Order";

export default function Home({ restaurants }) {
  const [vendors, setVendors] = useState(restaurants?.result?.vendors);
  const [showModal, setShowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [menus, setMenus] = useState({});
  const [cart, setCart] = useState({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false)
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };
  const toggleOrderModal = () => {
    setShowOrderModal(!showOrderModal);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://apimocha.com/ecatering-ui-test/menu"
      );
      const data = await response.json();
      setMenus(data);
    };
    fetchData();
  }, []);

  const addToCart = (itemId, details) => {
    setCart({
      ...cart,
      [itemId]: {
        quantity: 1,
        ...details,
      },
    });
  };
  const increaseQuantity = (itemId) => {
    setCart({
      ...cart,
      [itemId]: {
        ...cart[itemId],
        quantity: cart[itemId].quantity + 1,
      },
    });
  };
  const decreaseQuantity = (itemId) => {
    setCart({
      ...cart,
      [itemId]: {
        ...cart[itemId],
        quantity: cart[itemId].quantity - 1,
      },
    });
  };

  const addOrder = async () => {
    setOrderLoading(true)
    const newOrderHistory = [...orderHistory, {...cart}];
    setOrderHistory(newOrderHistory);
    
    const order = await fetch("https://apimocha.com/ecatering-ui-test/order", {
      method : "POST",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(newOrderHistory)
    })
    if(!!order) {
      setOrderLoading(false)
      localStorage.setItem("yourOrders", JSON.stringify(newOrderHistory));
      setCart({})
    }
   
  };
  return (
    <>
      
      <div className="flex flex-row top-36 relative justify-around">
        <button
          className="px-4 py-2 ml-3 bg-blue-500 text-white rounded"
          onClick={toggleCartModal}
        >
          View Cart
        </button>
        <button
          className="px-4 py-2 ml-3 bg-blue-500 text-white rounded"
          onClick={toggleOrderModal}
        >
          View Order History
        </button>
      </div>
      <div className="h-screen flex items-center justify-center">
        <div className="h-2/3 w-2/3 overflow-scroll overflow-x-hidden rounded-2xl border-gray-800 shadow-xl px-16">
          <div className="ml-28 mt-4">
            <div className="grid grid-cols-2 gap-6">
              <MenuProvider
                menus={menus}
                cart={cart}
                addToCart={addToCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              >
                {vendors.map((e) => (
                  <HomeCard
                    name={e?.name}
                    picUrl={e?.logo}
                    showModal={showModal}
                    toggleModal={toggleModal}
                  />
                ))}
              </MenuProvider>
            </div>
          </div>
        </div>

        {!!showCartModal && (
          <CartModal
            cart={cart}
            toggleCartModal={toggleCartModal}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            addOrder={addOrder}
            orderLoading={orderLoading}
          />
        )}
        {!!showOrderModal && (
          <OrderModal
            toggleOrderModal={toggleOrderModal}
           
          />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://apimocha.com/ecatering-ui-test/outlets");
  const restaurants = await res.json();

  return {
    props: {
      restaurants,
    },
  };
}
