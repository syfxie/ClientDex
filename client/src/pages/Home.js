import React from 'react';
import ContactCard from "../components/contactCard";
import ContactCell from "../components/contactCell";

import './Home.css'

export default function Home() {
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

    const contactsArray = [tempContact, tempContact, tempContact, tempContact, tempContact]

    return (
        <div className="list-container">
            {contactsArray.map((aContact) => {
                return <ContactCell contact={tempContact}/>
            }
            )}
        </div>
    );
}
