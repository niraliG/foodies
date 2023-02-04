import { useState, useContext, useEffect } from "react";
import { MenuContext } from "@/context/menuContext";
const MenuModal = ({ toggleModal }) => {
  const { menus, cart, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(MenuContext);
  const [menuItems, setMenuItems] = useState(menus?.result?.categories);
  useEffect(() => {
    if (!!menus?.result?.categories) setMenuItems(menus?.result?.categories);
  }, [menus?.result?.categories]);
  return (
    <div className="fixed w-2/4 h-min max-h-[50%] outline-none overflow-x-hidden overflow-y-auto shadow-md rounded-xl">
      <div className="relative w-auto pointer-events-none">
        <div className="border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="flex flex-shrink-0 items-center justify-center p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800">
              MENU
            </h5>
            <button
              className="absolute top-0 right-0 mt-4 mr-8 text-2xl font-medium text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={toggleModal}
            >
              x
            </button>
          </div>
          <div className="modal-body relative p-4 mb-2">
            <p>
              {Array.isArray(menuItems) ? (
                menuItems.map((category, i) => (
                  <div key={i} className="mb-6">
                    <h3 className="text-xl font-medium">{category.foodType}</h3>

                    {category.items.map((item) => (
                      <li key={item.id} className="py-2 flex items-center">
                        <span className="flex-1">{item.itemName}</span>
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${
                            item.isVegetarian ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <span className="mx-4"> ₹{item.sellingPrice} </span>
                        <img
                          src={item.image}
                          className="h-16 w-16 object-cover mr-4"
                          alt={item.itemName}
                        />
                        {cart[item.id]?.quantity === 0 ||
                        cart[item.id] == undefined ? (
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                            onClick={() =>
                              addToCart(item.id, {
                                itemName: item.itemName,
                                sellingPrice: item.sellingPrice,
                                isVegetarian: item.isVegetarian,
                                image: item.image,
                              })
                            }
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <div className="flex items-center">
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              -
                            </button>
                            <span className="text-lg font-medium mr-2">
                              {cart[item.id]?.quantity || 0}
                            </span>
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </div>
                ))
              ) : (
                <p>Loading..</p>
              )}
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button
              className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
