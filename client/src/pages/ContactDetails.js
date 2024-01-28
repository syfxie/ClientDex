import './ContactDetails.css';
import { useParams } from 'react-router-dom';

function ContactDetails() {
  const { id } = useParams(); // returns an object, and we only care about id
  return (
    <div>
      Contact details go here!
      {id}
    </div>
  );
}

export default ContactDetails;