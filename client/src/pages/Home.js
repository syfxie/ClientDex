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
    const [prevTallest, setPrevTallest] = useState("first");

    const changeContacts = async (c, id) => {
        setCategory(c);
        try {
            const response = await fetch('http://localhost:5000/category', {
                method: 'GET',
                body: category
            });
            setContacts(response.data);
            const currElement = document.getElementById(id);
            currElement.classList.add('taller');
            const prevElement = document.getElementById(prevTallest);
            prevElement.classList.remove('taller');
            setPrevTallest(currElement);
        } catch {
            console.log('failed to switch to category ', category);
        }
    }

    useEffect(() => {
        setContacts(contacts);
    }, [contacts])

    return (
        <div className='home'>
            <div className='contents'>
                <div className='tabs'>
                    <div className='darkTab taller' id="first" onClick={() => changeContacts('Contact Soon', "first")}>Contact Soon</div>
                    <div className='lightTab' id="second" onClick={() => changeContacts('Potential Customer', 'second')}>Potential Customer</div>
                    <div className='darkTab' id="third" onClick={() => changeContacts('Cold Calls', 'third')}>Cold Calls</div>
                    <div className='lightTab' id="fourth" onClick={() => changeContacts('Current Clients', 'fourth')}>Current Clients</div>
                    <div className='darkTab' id="fifth" onClick={() => changeContacts('VIP Clients', 'fifth')}>VIP Clients</div>
                    <div className='lightTab' id="sixth" onClick={() => changeContacts('Others', 'sixth')}>Others</div>
                    <div className='darkTab' id="seventh" onClick={() => changeContacts('Past Clients', 'seventh')}>Past Clients</div>
                    <div className='lightTab' id="eighth" onClick={() => changeContacts('Blacklist', 'eighth')}>Blacklist</div>
                </div>
                <div className="list-container">
                    {contacts.map((aContact) => {
                        return <ContactCell contact={aContact}/>
                    }
                    )}
                </div>
            </div>
        </div>
    )
}
