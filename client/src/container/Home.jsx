import "../styles/home.scss";
import inauguration from '../assets/images/aata_inauguration.jpg';

export const Home = () => {
    return (
        <div>
            <h1 className="homeHeader marginBorder">
                All America Tulu Association (AATA) also known as <i>Akila Americoda Tuluvere Angana </i> 
                 is a community organization of people having their origin in Tulunad of karnataka and kerala
                states of India. AATA was born out of a desire to build a vibrant Tulu community on first day
                of paggu month of Tulu New Year, April 14, 2021.
           </h1 > 
            <img className="homeImgae" src={inauguration} alt="Tulu Class" />
            <h2 className="homeHeader marginBorder homeInfo">
                <p>We are excited to invite you to the inauguration of our association "All America Tulu Association".
                You can watch the live event on our youtube channel on October 10th 2021. Please find the details on our event poster.</p>
                <a href = 'https://aatana.org/AATALive' target = "_blank" rel="noreferrer">AATALive</a>
            </h2> 
        </div>
    )
}
