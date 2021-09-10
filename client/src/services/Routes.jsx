import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from '../container/Home';
import { WhoAreWe } from '../container/AboutUs/WhoAreWe';
import { ByLaw } from '../container/AboutUs/ByLaw';
import { ExecutiveBoard } from '../container/Committee/ExecutiveBoard';
import { BoardOfDirectors } from '../container/Committee/BoardOfDirectors';
import { RegionalAmbassadors } from '../container/Committee/RegionalAmbassadors';
import { Advisors } from '../container/Committee/Advisors';
import { Charity } from '../container/GetInvolved/Charity';
import { Voluntary } from '../container/GetInvolved/Voluntary';
import { Sponsor } from '../container/GetInvolved/Sponsor';
import { Donors } from '../container/GetInvolved/Donors';
import { OurPartners } from '../container/GetInvolved/OurPartners';
import { Events } from '../container/Activities/Events';
import { MediaCoverage } from '../container/Activities/MediaCoverage';
import { Newsletter } from '../container/Activities/Newsletter';
import { TuluHistory } from '../container/Tulunaad/TuluHistory';
import { TuluLipi } from '../container/Tulunaad/TuluLipi';
import { TuluForBegineers } from '../container/Tulunaad/TuluForBegineers';
import { WhosWho } from '../container/Tulunaad/WhosWho';
import { Mythology } from '../container/Tulunaad/Mythology';
import { Tradition } from '../container/Tulunaad/Tradition';
import { Coastalwood } from '../container/Tulunaad/Coastalwood';
import { TuluLinks } from '../container/Tulunaad/TuluLinks';
import { Delicacies } from '../container/Resources/Delicacies';
import { IndianRestaurants } from '../container/Resources/IndianRestaurants';
import { IndianGroceries } from '../container/Resources/IndianGroceries';
import { IndianClothes } from '../container/Resources/IndianClothes';
import { MusicTeachers } from '../container/Resources/MusicTeachers';
import { DanceTeachers } from '../container/Resources/DanceTeachers';
import { ArtTeachers } from '../container/Resources/ArtTeachers';
import { Boston } from '../container/RegionalKootas/Boston';
import { California } from '../container/RegionalKootas/California';
import { NewYork } from '../container/RegionalKootas/NewYork';
import { BecomeAMember } from '../container/BecomeAMember';
import { Donate } from '../container/Donate';
import { ContactUs } from '../container/ContactUs';
import { CheckMembers } from "../container/CheckMembers";

export const Routes = () => {
    const routes = (
        <Switch>
            <Route exact path="/"><Redirect to="/home" /></Route>
            <Route path="/home" ><Home /></Route>
            <Route path="/whoAreWe" ><WhoAreWe /></Route>
            <Route path="/byLaw" ><ByLaw /></Route>
            <Route path="/executiveBoard" ><ExecutiveBoard /></Route>
            <Route path="/boardOfDirectors" ><BoardOfDirectors /></Route>
            <Route path="/regionalAmbassadors" ><RegionalAmbassadors /></Route>
            <Route path="/advisors" ><Advisors /></Route>
            <Route path="/charity" ><Charity /></Route>
            <Route path="/voluntary" ><Voluntary /></Route>
            <Route path="/sponsor" ><Sponsor /></Route>
            <Route path="/donors" ><Donors /></Route>
            <Route path="/ourPartners" ><OurPartners /></Route>
            <Route path="/events" ><Events /></Route>
            <Route path="/mediaCoverage" ><MediaCoverage /></Route>
            <Route path="/newsletter" ><Newsletter /></Route>
            <Route path="/tuluHistory" ><TuluHistory /></Route>
            <Route path="/tuluLipi" ><TuluLipi /></Route>
            <Route path="/tuluForBegineers" ><TuluForBegineers /></Route>
            <Route path="/whosWho" ><WhosWho /></Route>
            <Route path="/mythology" ><Mythology /></Route>
            <Route path="/tradition" ><Tradition /></Route>
            <Route path="/coastalwood" ><Coastalwood /></Route>
            <Route path="/tuluLinks" ><TuluLinks /></Route>
            <Route path="/delicacies" ><Delicacies /></Route>
            <Route path="/indianRestaurants" ><IndianRestaurants /></Route>
            <Route path="/indianGroceries" ><IndianGroceries /></Route>
            <Route path="/indianClothes" ><IndianClothes /></Route>
            <Route path="/musicTeachers" ><MusicTeachers /></Route>
            <Route path="/danceTeachers" ><DanceTeachers /></Route>
            <Route path="/artTeachers" ><ArtTeachers /></Route>
            <Route path="/boston" ><Boston /></Route>
            <Route path="/california" ><California /></Route>
            <Route path="/newYork" ><NewYork /></Route>
            <Route path="/becomeAMember" ><BecomeAMember /></Route>
            <Route path="/donate" ><Donate /></Route>
            <Route path="/contactUs" ><ContactUs /></Route>
            <Route path="/checkMembers"><CheckMembers/></Route>
            <Route path="*"><Redirect to="/home" /></Route>
        </Switch>
    )

    return (
        <>
            {routes}
        </>
    )
}
