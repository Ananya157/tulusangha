import "../styles/home.scss";

import TuluSpokenClass from '../assets/images/aata_tulu_spoken_class_3.jpg';
import TuluNews1 from '../assets/images/aata_news_in_dj_1.jpg';
import TuluNews2 from '../assets/images/aata_news_in_dj_2.jpg';
import TuluNews3 from '../assets/images/aata_news_in_tok.jpg';
import TuluNews4 from '../assets/images/aata_news_in_udayavani.jpeg';

export const Home = () => {
    return (
        <div>
            <h1 className="homeHeader marginBorder">
                All American Tulu Association (AATA) also known as Akila Americoda Tuluvere
                Angana is a community organization of people having their origin in Tulunad Americaof karnataka and kerala
                states of India. AATA was born out of a desire to build a vibrant Tulu community on first day
                of paggu month of Tulu New Year, April 14, 2021.
           </h1>
            <img className="homeImgae" src={TuluSpokenClass} alt="Tulu Class" />
            <h1 className="homeHeader marginBorder homeInfo">
                Please join our new initiative where you can learn to speak Tulu from our experts.
                <br />
                Bale Tulu Paterga.
                <br />Please register here using the Google Form Link.
            </h1>
            <img className="homeImgae imageBorder" src={TuluNews1} alt="Times Of Kudla" />
            <img className="homeImgae imageBorder" src={TuluNews2} alt="Times Of Kudla" />
            <img className="homeImgae imageBorder" src={TuluNews3} alt="Times Of Kudla" />
            <img className="homeImgae imageBorder" src={TuluNews4} alt="Times Of Kudla" />
        </div>
    )
}