import'./Tabs.css';

function TabGroup({ links }) {

    return (
        <>
            <ul id="tabs">
                {links.map((link) => link)}   
            </ul>
        </>
    )
};

export default TabGroup;