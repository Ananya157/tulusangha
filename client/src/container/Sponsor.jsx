
import "../styles/home.scss";
import React from "react";
import { TuluForm } from '../components/TuluForm'

export const SponsorPage = () => {
    const page = "Sponsor"
    return (
        <div>
            <h1 className="homeHeader newsletter border">
                Sponsorship
                </h1>
            <h1 className="homeHeader tuluLipi marginBorder">
                Sponsored Picture Greeting: $75 per greeting
                <br />
                Sponsored Crawl Greeting: $25 per greeting
                <br />
                Business Sponsoring - Banner: $250 per greeting
                <br />
                Business Sponsoring - Crawl: $75 per greeting
            </h1>
            <TuluForm whichpage={page} />
        </div>
    )
}
