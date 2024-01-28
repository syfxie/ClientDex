import React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useNavigate } from 'react-router-dom';

import './contactCell.css'
import Button from "./button";

export default function ContactCell({contact}){
    const navigate = useNavigate();
    console.log(contact);
    const toDetailPage = () => {
        let path = `/details/${contact._id}`
        navigate(path);
    }

    return (
        <div className="outer-container">
            <div className="inner-container">
                <div className="personal-info-container">
                    <AccountCircleSharpIcon className="icon" fontSize={"large"}/>

                    <div className="personal-info">
                        <h3 className="heading">{contact.firstName} {contact.lastName}
                    </h3>
                    <p className="text">{contact.company}</p>
                    </div>
                </div>

                <div className="contact">
                    <p className="text">{contact.email}</p>
                    <p className="text">{contact.phone}</p>
                </div>
            </div>

            <Button text={"EDIT"} fontSize={14}/>
            <IconButton className="icon"
                        size="large"
                        onClick={toDetailPage}
                        disableFocusRipple
                        aria-label="View Contact"
                        >
                <ArrowCircleRightOutlinedIcon />
            </IconButton>

        </div>
    );
}