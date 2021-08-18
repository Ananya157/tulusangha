import "../../styles/home.scss";
import MediaCoverage1 from '../../assets/images/aata_news_in_tok.jpg';
import MediaCoverage2 from '../../assets/images/aata_news_in_dj_1.jpg';
import MediaCoverage3 from '../../assets/images/aata_news_in_dj_2.jpg';
import MediaCoverage4 from '../../assets/images/aata_news_in_udayavani.jpeg';

export const MediaCoverage = () => {
    return (
        <div>
            <h1 className="homeHeader marginBorder newsletter">
                News Articles Published About AATA
           </h1>
            <h1 className="homeHeader newsletter">
                Times of Kudla
           </h1>
            <img className="homeImgae imageBorder" src={MediaCoverage1} alt="Times Of Kudla" />
            <img className="homeImgae imageBorder" src={MediaCoverage2} alt="Times Of Kudla" />
            <img className="homeImgae imageBorder" src={MediaCoverage3} alt="Times Of Kudla" />
            <img className="homeImgae imageBorder" src={MediaCoverage4} alt="Times Of Kudla" />
        </div>
    )
}