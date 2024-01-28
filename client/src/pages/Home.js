import React, {useEffect, useState} from 'react';
import ContactCard from "../components/contactCard";
import ContactCell from "../components/contactCell";

import './Home.css'

const tempContact = {
    first_name: 'Sophie',
    last_name: 'Xie',
    email: 'sophie@gmail.com',
    phone: '9056163560',
    company: 'XYC Inc',
    position: 'Sales Rep',
    location: 'Toronto, ON, Canada',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim',
    meeting_history: ['02-02-2028', '01-01-2027'],
    labels: ['Potential Customer', 'Contact Soon'],
    contact_frequency: 7
}
export default function Home() {
    const [contacts, setContacts] = useState([tempContact, tempContact, tempContact, tempContact, tempContact]);
    const [category, setCategory] = useState('Contact Soon'); // String containing the category of contacts

    const changeContacts = async (c) => {
        setCategory(c);
        try {
            const response = await fetch('http://localhost:5000/category', {
                method: 'GET',
                body: category
            });
            setContacts(response.data);
        } catch {
            console.log('failed to switch to category ', category);
        }
    }

    useEffect(() => {
        setContacts(contacts);
    })

    return (
        <div>
            <div className='tabs'>
                <div onClick={() => changeContacts('Contact Soon')}>Contact Soon</div>
                <div onClick={() => changeContacts('Potential Customer')}>Potential Customer</div>
                <div onClick={() => changeContacts('Cold Calls')}>Cold Calls</div>
                <div onClick={() => changeContacts('Current Clients')}>Current Clients</div>
                <div onClick={() => changeContacts('VIP Clients')}>VIP Clients</div>
                <div onClick={() => changeContacts('Others')}>Others</div>
                <div onClick={() => changeContacts('Past Clients')}>Past Clients</div>
                <div onClick={() => changeContacts('Blacklist')}>Blacklist</div>
            </div>
            <div className="list-container">
                {contacts.map((aContact) => {
                    return <ContactCell contact={aContact}/>
                }
                )}
            </div>
        </div>
    );
}
