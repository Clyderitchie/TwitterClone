import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

import './ActiveUser.css';

function ActiveUser() {

    const userId = Auth.getProfile().data._id;

    const { data } = useQuery(QUERY_ME, { fetchPolicy: 'cache-and-network' });

    const user = data?.me || {};
    // console.log("User: ", data);

    return (
        <>
            <div id="activeUserPill" className="container">
                <div className="row">
                    <div id="colBor" className="col-3 d-flex justify-content-center">
                        <img className="rounded-circle" src="https://placehold.co/80x80" alt="User Picture" />
                    </div>
                    <div id="colBor1" className="col-5 d-flex justify-content-center align-items-center">
                        {user.username}
                    </div>
                </div>
            </div>
        </>
    )
};

export default ActiveUser;