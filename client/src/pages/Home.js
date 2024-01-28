import React, {useEffect, useState} from 'react';
import ContactCell from "../components/contactCell";
import { useNavigate } from "react-router-dom";
import Mic from '../components/Mic';

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
        try {
            const response = await fetch(`http://localhost:5000/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category: c }), // Send category as an object with the key 'category'
            });

            if (!response.ok) {
                console.log(response);
                throw new Error('Network response was not ok');
            }
            console.log(id);
            const responseData = await response.json();
            // const currElement = document.getElementById(id.toString());
            // console.log(currElement.classList);
            // currElement.classList.add('taller');
            // const prevElement = document.getElementById(prevTallest);
            // prevElement.classList.remove('taller');
            // console.log(prevElement);
            // setPrevTallest(currElement);
            setContacts(responseData);
            setCategory(c);
        } catch (error) {
            console.log('failed to switch to category ', category, "because ", error);
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
                    <div className='lightTab' id="second" onClick={() => changeContacts('Potential Client', 'second')}>Potential Client</div>
                    <div className='darkTab' id="third" onClick={() => changeContacts('Cold Call', 'third')}>Cold Call</div>
                    <div className='lightTab' id="fourth" onClick={() => changeContacts('Current Client', 'fourth')}>Current Client</div>
                    <div className='darkTab' id="fifth" onClick={() => changeContacts('Urgent', 'fifth')}>Urgent</div>
                    <div className='lightTab' id="sixth" onClick={() => changeContacts('Past Client', 'sixth')}>Past Client</div>
                    <div className='darkTab' id="seventh" onClick={() => changeContacts('Blacklisted', 'seventh')}>Blacklisted</div>
                </div>
                <div className="list-container">
                    {contacts.map((aContact) => {
                        return <ContactCell contact={aContact}/>
                    }
                    )}
                </div>
            </div>

            <Mic/>
        </div>
    );
}
