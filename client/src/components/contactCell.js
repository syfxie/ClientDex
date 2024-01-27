import React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import './contactCell.css'

export default function ContactCell({contact}){
    return (
        <div className="outer-container">
            <div className="inner-container">
                <div className="personal-info-container">
                    <AccountCircleSharpIcon className="icon" fontSize={"large"}/>

                    <div className="personal-info">
                        <h3 className="heading">{contact.first_name} {contact.last_name}
                    </h3>
                    <p className="text">{contact.company}</p>
                    </div>
                </div>

                <div className="contact">
                    <p className="text">{contact.email}</p>
                    <p className="text">{contact.phone}</p>
                </div>
            </div>

            <IconButton className="icon"
                        size="large"
                        onClick={() => {}}
                        disableFocusRipple
                        aria-label="View Contact">
                <ArrowCircleRightOutlinedIcon />
            </IconButton>
        </div>
    );
}