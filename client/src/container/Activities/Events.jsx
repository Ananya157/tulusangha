import "../../styles/home.scss";
import TuluSpokenClass from '../../assets/images/aata_tulu_spoken_class_3.jpg';
import ProgramSignUp from '../../assets/images/aata_cult_prog_signup.jpg';
import RegMeeting from '../../assets/images/reg_meeting_west.bmp';

export const Events = () => {
    return (
        <div>

            <h1 className="homeHeader newsletter">
                Current Events in AATA 
           </h1>
            <img className="homeImgae" src={ProgramSignUp} alt="Tulu Class" />
            <img className="homeImgae" src={RegMeeting} alt="Tulu Class" />
            <img className="homeImgae" src={TuluSpokenClass} alt="Tulu Class" />
            <h1 className="homeHeader marginBorder homeInfo">
                Please join our new initiative where you can learn to speak Tulu from our experts.
                <br />
                Bale Tulu Paterga.
            </h1>
        </div>
    )
}