import React, {useEffect, useState} from 'react';
import MarkunreadRoundedIcon from '@mui/icons-material/MarkunreadRounded';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

import {COLORS} from "../constants/colors";
import Button from './button'
import './contactCard.css'

export default function ContactCard({contact}){
    return (
        <div className="container">
            <div className="header">
                <div className="general-info">
                    <div className="details">
                        <h1>
                            {contact.first_name} {contact.last_name}
                        </h1>

                        <p className="position">
                            {contact.position ? contact.position + ', ' : ''}{contact.company}
                        </p>
                    </div>

                    <div className="contact-info">
                        <div className="icon-text-group">
                            <MarkunreadRoundedIcon fontSize={"small"}/>
                            <p className="underlined">{contact.email}</p>
                        </div>

                        <div className="icon-text-group">
                            {/*TODO: Sophie format phone number*/}
                            <PhoneEnabledIcon fontSize={"small"}/>
                            <p className="underlined">{contact.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="label-group">
                    {contact.labels.map((aLabel) => {
                        return (
                            <Button text={aLabel}
                                    color={'#505050'}
                                    fontSize={14}
                                    background={'#FBF56B'}
                                    padding={'3px'}
                                    margin={'3px'}
                                    border={'#FBF3F3 2px solid'}
                                    disabled={true}/>
                        );
                    })}
                </div>
            </div>

            <div className="body">
                <div className="notes-section">

                    <h4>Notes</h4>
                    <div className="notes-container">
                        {/*<h4 id="notes-heading">Notes</h4>*/}
                        <p className="dark-text">{contact.notes}</p>
                    </div>
                </div>

                <div className="inner-container">
                    <div className="meeting-history">
                        <h4>Meeting History</h4>

                        <p>
                            {contact.meeting_history.map((aMeeting) => {
                                return (
                                    <p>
                                        | {aMeeting}
                                    </p>
                                );
                            })}
                        </p>

                        <div className="button-group">
                            <Button text={"Contacted Today"} fontSize={14}/>
                            <Button text={"Add a Meeting"} fontSize={14}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer">
                <Button text={"BACK"}/>

                <div className="button-group">
                    <Button text={"EDIT"}/>
                    <Button text={"DELETE"} color={'white'} background={'#FF0000'}/>
                </div>
            </div>
        </div>
    );
}