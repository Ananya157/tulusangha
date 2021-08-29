import "../styles/home.scss"
export const MembershipHeader = () => {
    return (
        <div>
            <h1 className="homeHeader newsletter">
                Membership
           </h1>
            <h1 className="homeHeader disclamer marginBorder">
                Any person eighteen years or older and subscribes to the objectives of the association and pays dues, is entitled to be a member of the association. Membership in this corporation shall be open to all persons with roots in Tulunadu and/or interested in Tulu language or culture.
                Members must agree to abide by the by-laws of the Association.
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
    )
}