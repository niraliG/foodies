const CartModal = ({
  cart,
  toggleCartModal,
  increaseQuantity,
  decreaseQuantity,
  addOrder,
  orderLoading 
}) => {
  return (
    <div class="fixed w-2/4 h-min outline-none overflow-x-hidden overflow-y-auto  rounded-2xl border-gray-900 border-1 shadow-2xl">
      <div class="border-none shadow-lg relative flex flex-col w-full h-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div class="flex flex-shrink-0 items-center justify-center p-4 border-b border-gray-200 rounded-t-md">
          <h5
            class="text-xl font-medium leading-normal text-gray-800"
          >
            CART
          </h5>
          <button
            className="absolute top-0 right-0 mt-4 mr-8 text-2xl font-medium text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={toggleCartModal}
          >
            x
          </button>
        </div>
        <div class="relative p-4">
          <p>
            {Object.entries(cart).length ? (
              Object.entries(cart).map(([id, details]) => (
                <div key={id} className="mb-4">
                  <div className="py-2 flex items-center">
                    <span className="flex-1">{details.itemName}</span>
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        details.isVegetarian ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    <span className="mx-4">
                      {" "}
                      &#8377; {details.sellingPrice}{" "}
                    </span>
                    <img
                      src={details.image}
                      className="h-16 w-16 object-cover mr-4"
                      alt={details.itemName}
                    />

                    <div className="flex items-center">
                      <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2"
                        onClick={() => decreaseQuantity(id)}
                      >
                        -
                      </button>
                      <span className="text-lg font-medium mr-2">
                        {cart[id]?.quantity || 0}
                      </span>
                      <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                        onClick={() => increaseQuantity(id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Cart is Empty!! </p>
            )}
          </p>
          {
            !!orderLoading && <p>Placing your Order...</p>
          }
          <br />
          <button
            className={`px-4 py-2 ml-3 bg-blue-600 text-white float-right ${!Object.entries(cart).length && "bg-gray-500 cursor-not-allowed" }`}
            onClick={addOrder}
          >
            Place Order
          </button>
        </div>
        <div class="flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
          <button
            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md"
            onClick={toggleCartModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
