import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <>
    <div className='Headersection'>
        <div className="title">
            <Link id="he" to='/'>
                <h2>Shopping Mall</h2>
            </Link>
            
        </div>
        <div className="left">
            <ul>
                <li>Women</li>
                <li>Men</li>
                <li>Children</li>
                <li>Beauty</li>
            </ul>
        </div>
        <div className="center">
            <input id="Search-input" type="text" placeholder="Search..."/>
            <button id="search-button">Search</button>
        </div>
        <div className="right">
        <div className="cart">
            <Link id="cart" to='/cart'>{<FontAwesomeIcon icon={faCartShopping} />}Cart</Link>
        </div>
            <div className="signin">
                
                <Link id="log" to='/'>Logout</Link>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Header