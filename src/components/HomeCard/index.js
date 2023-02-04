import MenuModal from "@/components/Menu";
const HomeCard = ({
  name,
  picUrl,
  showModal,
  toggleModal,
  menus,
  cart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <>
      <div className="w-80 bg-white shadow-xl rounded-xl border-y-1 border-x-1 border-gray-800">
        <div
          className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              picUrl
                ? picUrl
                : "https://jkfenner.com/wp-content/uploads/2019/11/default.jpg"
            })`,
          }}
        ></div>
        <div className="p-4 flex flex-col items-center">
          <h1 className="text-gray-800 text-center mt-1"> {name}</h1>

          <div className="inline-flex items-center mt-2"></div>

          <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
            onClick={toggleModal}
          >
            View Menu
          </button>
        </div>
      </div>
      {!!showModal && (
        <>
          <MenuModal
            toggleModal={toggleModal}
            menus={menus}
            cart={cart}
            addToCart={addToCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        </>
      )}
    </>
  );
};

export default HomeCard;
