import './EditContact.css';
import { useState } from 'react';

function EditContact({ previousContact }) {

  const [contact, setContact] = useState({
    firstName: previousContact.firstName || "",
    lastName: previousContact.lastName || "",
    location: previousContact.location || "",
    emailAddress: previousContact.emailAddress || "",
    phoneNum: previousContact.phoneNum || "",
    company: previousContact.company || "",
    category: previousContact.category || "",
    notes: previousContact || ""
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }

  const categories = [
    'Blacklisted', 'Current Client', 'Past Client', 'Urgent', 'Cold Call', 'Potential Client'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted!")
    console.log(contact)
    try {
      const response = await fetch('http://127.0.0.1:5000/update_contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      const data = await response.json();
      console.log(data);

      // set back to empty object
      setContact({
        firstName: "",
        lastName: "",
        location: "",
        emailAddress: "",
        phoneNum: "",
        company: "",
        category: "",
        notes: ""
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
<<<<<<< HEAD
      <div className="main-container">
        <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="top-bar">
            <p className="add-contact">Add Contact</p>
            <button
            type="submit"
            className="submit-btn"
            >Done
            </button>
          </div>
          <div className="fields-top">
            <input
            type="text"
            placeholder="First name..."
            name="firstName"
            value={contact.firstName}
            onChange={handleChange}
            />
            <input 
            type="text" 
            placeholder="Last name..."
            name="lastName"
            value={contact.lastName}
            onChange={handleChange}
            />
            <input
            type="text"
            placeholder="Location.."
            name="location"
            value={contact.location}
            onChange={handleChange}
            />
            </div>
            <div className="fields-bottom">
            <input
            type="email"
            placeholder="Email address"
            name="emailAddress"
            value={contact.emailAddress}
            onChange={handleChange}
            />
            <input
            type="tel"
            placeholder="Phone Number"
            name="phoneNum"
            value={contact.phoneNum}
            onChange={handleChange}
            />
            <input
            type="text"
            placeholder="Company"
            name="company"
            value={contact.company}
            onChange={handleChange}
            />
          <select
            name="category"
            value={contact.category}
            onChange={handleChange} // can't seem to be able to select multiple items at once :()
            >
              {categories.map((category) => {
                return (
                  <option key={category} onChange={handleChange}>
                   {category}
                  </option>
                );
              })}
            </select>
            </div>
          <div>
            <textarea
            placeholder="Notes..."
            value={contact.notes}
            onChange={handleChange}
            className="notes-box"
            name="notes"
            />
          </div>
        </form>
        </div>
      </div>
    </div>
=======
      Edit Contact Pages goes here
    </div>                                                                      
>>>>>>> e761044a7915ccbb0a3b1fbb3c49b3de15ccb137
  );
}

export default EditContact;