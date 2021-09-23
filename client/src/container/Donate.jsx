
import "../styles/home.scss";
import React from "react";
import { TuluForm} from '../components/TuluForm'

export const Donate = () => {
    const page = "Donate"
        return (
            <div>
                <h1 className="homeHeader newsletter border">
                    Donation
                </h1>
                <h1 className="homeHeader tuluLipi marginBorder">
                    AATA General Donor: Upto to $250
                    <br />
                    AATA Bolpu: Above $250
                    <br />
                    AATA Bolli: Above $500
                    <br />
                    AATA Aisra: Above $1000
                    <br />
                    AATA Prerme: Above $5000
                </h1>
                <TuluForm whichpage ={page}/> 
            </div>
        )
    }
