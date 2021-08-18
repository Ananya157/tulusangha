import AdvisorsJson from '../../assets/committeeData/advisors.json'
import "../../styles/home.scss";
import { List } from 'antd';


export const Advisors = () => {
    return (
        <div>
            <h1 className="homeHeader marginBorder newsletter">Advisors</h1>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={AdvisorsJson}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        style={{ borderBottom: 'solid #FFBC1D' }} 
                        extra={
                            <>
                                <h1 className="homeHeader newsletter">{item.title}</h1>
                                <img width={200} alt={item.name} src={item.image} />
                            </>
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