import { TreeSelect } from 'antd';

export const DropDown = (props) => {
    const handleChange = value => {
        console.log("Child: " + value)
        props.onchange(value);
    }
    return (
        <div>
            <TreeSelect onChange={handleChange} 
                treeData={[
                    {
                        title: 'USA',
                        value: 'usa',
                        children: [
                            { title: 'Alaska', value: 'AK', },
                            { title: 'Alabama', value: 'AL', },
                            { title: 'Arkansas', value: 'AR', },
                            { title: 'Arizona', value: 'AZ', },
                            { title: 'California', value: 'CA', },
                            { title: 'Colorado', value: 'CO', },
                            { title: 'Connecticut', value: 'CT', },
                            { title: 'District of Columbia', value: 'DC', },
                            { title: 'Delaware', value: 'DE', },
                            { title: 'Florida', value: 'FL', },
                            { title: 'Georgia', value: 'GA', },
                            { title: 'Hawaii', value: 'HI', },
                            { title: 'Iowa', value: 'IA', },
                            { title: 'Idaho', value: 'ID', },
                            { title: 'Illinois', value: 'IL', },
                            { title: 'Indiana', value: 'IN', },
                            { title: 'Kansas', value: 'KS', },
                            { title: 'Kentucky', value: 'KY', },
                            { title: 'Louisiana', value: 'LA', },
                            { title: 'Massachusetts', value: 'MA', },
                            { title: 'Maryland', value: 'MD', },
                            { title: 'Maine', value: 'ME', },
                            { title: 'Michigan', value: 'MI', },
                            { title: 'Minnesota', value: 'MN', },
                            { title: 'Missouri', value: 'MO', },
                            { title: 'Mississippi', value: 'MS', },
                            { title: 'Montana', value: 'MT', },
                            { title: 'North Carolina', value: 'NC', },
                            { title: 'North Dakota', value: 'ND', },
                            { title: 'Nebraska', value: 'NE', },
                            { title: 'New Hampshire', value: 'NH', },
                            { title: 'New Jersey', value: 'NJ', },
                            { title: 'New Mexico', value: 'NM', },
                            { title: 'Nevada', value: 'NV', },
                            { title: 'New York', value: 'NY', },
                            { title: 'Ohio', value: 'OH', },
                            { title: 'Oklahoma', value: 'OK', },
                            { title: 'Oregon', value: 'OR', },
                            { title: 'Pennsylvania', value: 'PA', },
                            { title: 'Puerto Rico', value: 'PR', },
                            { title: 'Rhode Island', value: 'RI', },
                            { title: 'South Carolina', value: 'SC', },
                            { title: 'South Dakota', value: 'SD', },
                            { title: 'Tennessee', value: 'TN', },
                            { title: 'Texas', value: 'TX', },
                            { title: 'Utah', value: 'UT', },
                            { title: 'Virginia', value: 'VA', },
                            { title: 'Vermont', value: 'VT', },
                            { title: 'Washington', value: 'WA', },
                            { title: 'Wisconsin', value: 'WI', },
                            { title: 'West Virginia', value: 'WV', },
                            { title: 'Wyoming', value: 'WY', },
                        ],
                    }, {
                        title: 'CANNADA',
                        value: 'ca',
                        children: [
                            { title: 'Alberta', value: 'AB', },
                            { title: 'British Columbia', value: 'BC', },
                            { title: 'Manitoba', value: 'MB', },
                            { title: 'New Brunswick', value: 'NB', },
                            { title: 'Newfoundland', value: 'NF', },
                            { title: 'Northwest Territories', value: 'NT', },
                            { title: 'Nova Scotia', value: 'NS', },
                            { title: 'Nunavut', value: 'NU', },
                            { title: 'Ontario', value: 'ON', },
                            { title: 'Prince Edward Island', value: 'PE', },
                            { title: 'Quebec', value: 'QC', },
                            { title: 'Saskatchewan', value: 'SK', },
                            { title: 'Yukon Territory', value: 'YT', },
                        ],
                    },
                ]}
            />
        </div>
    )
}