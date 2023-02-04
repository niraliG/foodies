const OrderModal = ({ toggleOrderModal}) => {
  const orders = JSON.parse(localStorage.getItem("yourOrders")) || null;
  return (
      <div class="fixed w-2/4 h-min max-h-[50%] outline-none overflow-x-hidden overflow-y-auto  rounded-2xl border-gray-900 border-1 shadow-2xl border-none flex flex-col  pointer-events-auto bg-white bg-clip-padding  text-current">
        <div class="flex flex-shrink-0 items-center justify-center p-4 border-b border-gray-200 rounded-t-md">
          <h5
            class="text-xl font-medium leading-normal text-gray-800"
            id="exampleModalScrollableLabel"
          >
            YOUR ORDER HISTORY
          </h5>
          <button
            className="absolute top-0 right-0 mt-4 mr-8 text-2xl font-medium text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={toggleOrderModal}
          >
            x
          </button>
        </div>
        <div class="modal-body relative p-4">
          <p>
            {!!orders ? (
              orders?.map((order, i) => (
                <div key={i} className="mb-4">
                  <h4 class="text-lg font-bold">Order {i + 1}</h4>
                  {Object.values(order).map((item, itemIndex) => (
                    <div key={itemIndex} class="flex items-center mt-4">
                      <img
                        src={item.image}
                        alt={item.itemName}
                        class="w-16 h-16 mr-4 rounded-full"
                      />
                      <div>
                        <h5 class="font-bold">{item.itemName}</h5>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.sellingPrice}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>You haven't placed any order yet!! </p>
            )}
          </p>
        
          <br />
        </div>
        <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md"
            onClick={toggleOrderModal}
          >
            Close
          </button>
        </div>
      </div>
  );
};

export default OrderModal;
