import './ContactDetails.css';
import { useParams } from 'react-router-dom';
import ContactCard from '../components/contactCard';
import { useState, useEffect } from 'react';


function ContactDetails() {
  const { id } = useParams(); // extracts the id from the url

  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/details?_id=${id}`);
        const data = await response.json();
        setContact(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };
    fetchContact();
  }, []);


  return (
    <div>
      {contact ? (
        <ContactCard contact={contact} />
      ) : (
        <p>Contact not found</p>
      )}
    </div>
  );
}

export default ContactDetails;