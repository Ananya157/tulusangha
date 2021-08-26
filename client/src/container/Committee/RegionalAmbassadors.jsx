import RegionalAmbassadorsJson from '../../assets/committeeData/regionalAmbassadors.json'
import "../../styles/home.scss";
import { List } from 'antd';

export const RegionalAmbassadors = () => {
    return (
        <div>
            <h1 className="homeHeader marginBorder newsletter">Founder Committee 2021-23: Regional Ambassadors</h1>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={RegionalAmbassadorsJson}
                renderItem={item => (
                    <List.Item
                        style={{ borderBottom: 'solid #FFBC1D' }} 
                        key={item.title}
                        extra={
                            <img width={272} alt={item.name} src={item.image} />
                        }>
                        <h1 className="listName">{item.name}</h1>
                        <h1 className="listName lsitAddress">{item.address}</h1>
                        <h1 className="homeHeader tuluLipi">
                            {item.description.split('\n').map((val, key) => {
                                return <span key={key}>{val}<br /><br /></span>
                            })}
                        </h1>
                    </List.Item>
                )}
            />
        </div>
    )
}