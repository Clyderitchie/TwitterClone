import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import TabGroup from './TabGroup';
import PostBtn from '../PostButton/Post';
import ActiveUser from '../AciveUser/ActiveUser';
// import More from '../MoreSection/MoreBtn';

import'./Tabs.css';

function Tabs({ logout, userId}) {
    // console.log("Tabs userId: ", userId);
    //  Passing the userId onto the profile Link correctly. This was done by passing userId as a 
    // Prop from the homepage where Tabs component is being called. 

    return (
        <TabGroup links={[
            <Link key={1} id="tabGroup" className='text-decoration-none text-dark' to="/home" state= {{userId: Auth.getProfile().data._id}}>
                <li className='tabList'>Home</li>
            </Link>,
            <Link key={2} className='text-decoration-none text-dark'>
                <li className='tabList'>Explore</li>
            </Link>,
            <Link key={3} className='text-decoration-none text-dark'>
                <li className='tabList'>Notifications</li>
            </Link>,
            <Link key={4} className='text-decoration-none text-dark'>
                <li className='tabList'>Messages</li>
            </Link>,
            <Link key={5} className='text-decoration-none text-dark' to={`/profile/${userId}`}>
               <li className='tabList'>Profile</li>
            </Link>,
            <Link key={6} className='text-decoration-none text-dark' to="/" onClick={logout}>
                <li className='tabList'>Logout</li>
            </Link>,
            <Link key={7} className='postBtn' state= {{userId: Auth.getProfile().data._id}} >
                {/* <PostBtn /> */}
            </Link>,
            <ActiveUser key={8}/>
        ]} />
    )
};

export default Tabs;