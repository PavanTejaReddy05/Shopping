//"marquee"
import net1 from './MImages/NetImage1.jpg';
import net2 from './MImages/NetImage2.jpg';
import net3 from './MImages/NetImage3.jpg';
import net4 from './MImages/NetImage4.jpg';
import net5 from './MImages/NetImage5.jpg';
import net6 from './MImages/NetImage6.jpg';
import net7 from './MImages/NetImage7.jpg';
import net8 from './MImages/NetImage8.jpg';
import net9 from './MImages/NetImage9.jpg';
import net10 from './MImages/NetImage10.jpg';
import net11 from './MImages/NetImage11.jpg';

const GentsCollection = () => {
const images = [net1, net11, net2, net3, net10, net4, net5, net8, net7, net6, net9];
  
  return (
    <>
    <div className="genc">
      <h2>Gents Fashion</h2>
    </div>
    <div className="MensFashion">
         
        <div className='marquee'>
            {/* <img className="fashion-image" src={net1} alt="image" />
            <img className="fashion-image" src={net11} alt="image" />
            <img className="fashion-image" src={net2} alt="image" />
            <img className="fashion-image" src={net3} alt="image" />
            <img className="fashion-image" src={net10} alt="image" />
            <img className="fashion-image" src={net4} alt="image" />
            <img className="fashion-image" src={net5} alt="image" />
            <img className="fashion-image" src={net9} alt="image" />
            <img className="fashion-image" src={net6} alt="image" />
            <img className="fashion-image" src={net7} alt="image" />
            <img className="fashion-image" src={net8} alt="image" /> */}
            <div className='marquee-content'>
            {images.map((image, index) => (
              <img key={index} className="fashion-image" src={image} alt={`image${index + 1}`} />
            ))}
            {images.map((image, index) => (
              <img key={`duplicate-${index}`} className="fashion-image" src={image} alt={`duplicate-image${index + 1}`} />
            ))}
          </div>
        </div>
    </div>
    </>
  )
}

export default GentsCollection;