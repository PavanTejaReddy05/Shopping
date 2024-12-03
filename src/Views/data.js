interface Item{
  image:string;
  price:string;
}

interface CartItem extends Item{
  quantity:number;
}


const Cart = ({cart}:{cart:CartItem[]}) => {
  return (
    <>
        <div className="cart">
            <form className="form">
                {/* <h3>Items in Cart</h3>
                {cart.map((item,index)=>(
                  <div className="cart-item">
                    <img src={`data:image/jpeg;base64,${item.image}`} alt={`Cart Item ${index+1}`} />
                    <p>{item.price}</p>
                    <p>Quantity:{item.quantity}</p>
                  </div>
                ))} */}
            </form>
        </div>
    </>
  );
};

export default Cart;