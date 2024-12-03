import { useState } from "react";

interface Item {
  image: string;
  price: string; // Price is a string with currency
}

interface Category {
  _id: string;
  title: string;
  items: Item[];
}


interface CollectionProps {
  data: Category[];
  addToCart: (item: Item, quantity: number) => void; // Accept addToCart as a prop
}

// Assuming useCart is a custom hook that provides addToCart function



const Collection = ({ data, addToCart }: CollectionProps) => {


  

  return (
    <div className="collection">
      {data.map((category) => (
        <div key={category._id} className="category">
          <h2>{category.title}</h2>
          <div className="products">
            {category.items.map((item, index) => {
              const [num,setNum]=useState(0);

              const increment=()=>setNum(num+1);
              const decrement=()=>{
                  if (num>0) setNum(num-1);
              };
              const handleAddToCart=()=>{
                  if(num>0){
                      addToCart(item,num);
                      // setNum(0);
                  }
              };
              return(
                      <div key={item.image} className="product">
                      <img 
                      id="colImg"
                      src={`data:image/jpeg;base64,${item.image}`}
                      alt={`Product ${index+1}`} 
                      />
                      <h3>Product {index+1}</h3>
                      <p>{item.price}</p>
                      <div className="it">
                          <p><b>Quantity: </b></p>
                          <p><b>{num}</b></p>
                          <div className="button-group">
                              <button id="inc" onClick={increment}> + </button>
                              <button id="addToCart" onClick={handleAddToCart}>Add to Cart</button>
                              <button id="dec" onClick={decrement}>-</button>
                          </div>
                      </div>
                  </div>
              );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collection;
