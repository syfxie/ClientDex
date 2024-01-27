import React, {useState} from 'react';
import useSlot from "@mui/material/utils/useSlot";

export default function labelButton ({text, color = '#00527A', onClick}) {
    const [clicked, setClicked] = useState(false);

    return(
        <button onClick={!clicked ? onClick : () => {}}>
            {text}
        </button>
    )
}