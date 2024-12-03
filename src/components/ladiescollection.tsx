import net1 from './GImages/GNetImag1.jpg'
import net2 from './GImages/GNetImag2.jpg'
import net3 from './GImages/GNetImag3.jpg'
import net4 from './GImages/GNetImag4.jpg'
import net5 from './GImages/GNetImag5.jpg'
import net6 from './GImages/GNetImag6.jpg'
import net7 from './GImages/GNetImag7.jpg'
import net8 from './GImages/GNetImag8.jpg'
import net9 from './GImages/GNetImag9.jpg'
import net10 from './GImages/GNetImag10.jpg'
import net11 from './GImages/GNetImag11.jpg'
import net12 from './GImages/GNetImag12.jpg'
import ban1 from '../assets/LadiesBanner.gif'
const Ladiescollection = () => {
const images=[net1,net12,net2,net3,net11,net4,net5,net10,net6,net7,net8,net9]
  return (
    <div>
        <div className="ladiesBanner">
            <img id='Pic1' src={ban1} alt="Banner" />
        </div>
        <div className="ladc">
          <h2>Ladies Fashion</h2>
        </div>
        <div className="LadiesFashion">
          <div className="marquee-content">
          {images.map((image,index)=>(
            <img key={index} className="fashion-image" src={image} alt={`image${index+1}`} />
           ))}
           {images.map((image,index)=>(
            <img key={`duplicate-${index}`} className='fashion-image' src={image} alt={`duplicate-image${index+1}`} />
           ))}
          </div> 
            {/* <img src={net1} alt="img"/>
            <img src={net12} alt="img"/>
            <img src={net2} alt="img"/>
            <img src={net3} alt="img"/>
            <img src={net11} alt="img"/>
            <img src={net4} alt="img"/>
            <img src={net5} alt="img"/>
            <img src={net10} alt="img"/>
            <img src={net6} alt="img"/>
            <img src={net7} alt="img"/>
            <img src={net8} alt="img"/>
            <img src={net9} alt="img"/> */}
        </div>
    </div>
  )
}

export default Ladiescollection;