import "../../styles/home.scss";
import TuluSpokenClass from '../../assets/images/HP-Kann.png';

export const WhoAreWe = () => {
    return (
        <div>
            <h1 className="homeHeader marginBorder">
                <p>
                    All America Tulu Association (AATA) also know as <em>Akhila Americoda Tuluvere Angana </em>a community organization of people having their origin in <em>Tulunad</em> area of Karnataka and Kerala states of India.
                    AATA was born out of a desire to build a vibrant Tulu community, on first day of <em>Paggu</em> month of Tulu New Year, April 14, 2021.
                    The mission is to bring all the people of Tulu roots together to preserve, support, promote Tulu language and culture by creating an opportunity, an effective platform to exchange ideas between the people of Tulu heritage who lives in North America.
                    AATA desires to outreach the Tulu language heritage and culture to their next generations and grooms a heritage pride identity.
                </p>
                <p>
                    In order to achieve these goals AATA intends to take up several activities in the form of programs and events to promote the various literary and performing art forms of Tulunad.
                </p>
                <p>
                    AATA is a charitable organization and believes in giving best social services and charity to the local and global community by developing and implementing various charitable activities in North America. 
                    There is an increasing need for social support system and timely help for the families, specially in times of emergencies and other difficult personal situations in life.
                </p>
            </h1>
            <img className="homeImgae" src={TuluSpokenClass} alt="Tulu Class" />
        </div>
    )
}