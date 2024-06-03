import { MenuItemType } from "../../models/menuItemType"
import Tab from 'react-bootstrap/Tab';
import Tabs from "react-bootstrap/Tabs";
import TabContainer from 'react-bootstrap/TabContainer'
import "./custom-tab-styles.css";
const categories = Object.keys(MenuItemType);

export type CategorySelectorParams ={
    onSelectCategory: (p:any) => void
}

const CategorySelector : React.FC<CategorySelectorParams> = ({ onSelectCategory }) => {

    const onSelect = async  (key : any) => {
        console.log("YEET:" , key)
        onSelectCategory(key);
    } 

    return <TabContainer>
            <Tabs defaultActiveKey="ALL"
        id="justify-tab-example"
        className="mb-3 bg-secondary rounded"
        variant="pills"
        onSelect={onSelect}
        justify
      >     
                        {/* <Tab eventKey="ALL" title="ALL"></Tab> */}
                        {
                            categories.map((cat) => {
                                return  <Tab eventKey={cat} title={cat}></Tab>
                                
                            })  
                        } 
                 
            </Tabs> 
        </TabContainer>

}

export default CategorySelector;