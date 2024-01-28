import Roladex from '../images/roladex.png';

function Landing() { 

  const imageStyle = {
    width: '45%', 
    height: 'auto',
    display: 'block',
    margin: 'auto',
  };

  const textStyle = {
    color: 'black',
    fontSize: '20px',
    display: 'block',
    margin: 'auto',
    textAlign: 'center'
  }


  return (
    <div>
      <img src={Roladex} alt="Logo" style={imageStyle}/>
      <p style={textStyle}>Taking you back in time...</p>
    </div>
  );
}

export default Landing;