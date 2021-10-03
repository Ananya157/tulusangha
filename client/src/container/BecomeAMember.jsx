import "../styles/home.scss";
import React from "react";
import { TuluForm } from '../components/TuluForm'
import pdf from "../assets/documents/aata_constitution_and_bylaws.pdf";

export const BecomeAMember = () => {
    const page = "BecomeAMember"
    return (
        <div>
            <div>
                <h1 className="homeHeader newsletter">
                    Membership
                </h1>
                <h1 className="homeHeader disclamer marginBorder">
                    Any person eighteen years or older and subscribes to the objectives of the association and pays dues, is entitled to be a member of the association. Membership in this corporation shall be open to all persons with roots in Tulunadu and/or interested in Tulu language or culture.
                    <b>Members must agree to abide by the by-laws of the Association.</b>
                    </h1>
                    <h1 className="homeHeader tuluLipi marginBorder">
                        Grand Patron Member - Family Membership: $1000 & above
                    <br />
                    Patron Member - Family Membership: $500 & above
                    <br />
                    Life Member - Family Membership: $100
                    <br />
                    Life Member - Individual Membership: $50
                </h1>
            </div>
            <TuluForm whichpage={page} />
            <h4 className='disclamer_bylaw'>*Please note that by clicking Join Us you agree to abide by the <a href = {pdf} target = "_blank" rel="noreferrer">By-Laws</a> of the association</h4>
        </div>
    )
}
