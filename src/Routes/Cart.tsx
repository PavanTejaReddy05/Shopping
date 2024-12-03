
interface CartItem {
  image: string;
  price: string;
  quantity: number;
}



const Cart = ({cart}:{cart:CartItem[]}) => {

  return (
    <div className="cartpage">
      <form className="form">
        <h3>Items in Cart</h3>
        {cart.length === 0 ? (
          <p>Your Cart is Empty</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li id="cartlist" key={index}>
                <img
                  id="cartimg"
                  src={`data:image/jpeg;base64,${item.image}`} // Ensure this is the correct data URI
                  alt={`Product ${index + 1}`}
                />
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default Cart;
