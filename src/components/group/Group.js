//dependencies
import React, {memo} from 'react';
import {Link} from 'react-router-dom'

//external files
import "./Group.css";
import brand from '../../assets/logo_transparent.png'

//JSX
const Group = () => {

    const groupMouseOver = event => {
        const sign = event.currentTarget.firstElementChild;

        sign.style.display = 'flex';
        sign.style.height = 20 + 'px';
    }

    const groupMouseOut = event => {
        const sign = event.currentTarget.firstElementChild;

        sign.style.display = 'none';
    }

    return(
        <div className="Group">
            
            <Link 
                to="/"
                className="group__discord" 
                onMouseOver={groupMouseOver}
                onMouseOut={groupMouseOut}
            >

                <div className="group__discord--sign">
                </div>

                <div className="group__discord--img">
                    <img src='https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png' />
                </div>

                <div className='group__discord--legend'>
                    Home
                </div>

            </Link>

            <ul className="group__groups">

                <li className="group__groups--li"
                    onMouseOver={groupMouseOver}
                    onMouseOut={groupMouseOut}
                >

                    <div className="group__groups--sign">

                    </div>

                    <div className="group__groups--perfil">

                        <div className="group__groups--img">

                        </div>

                        <div className="group__groups--layer-1">
                            <div className="group__groups--layer-2">
                                <div className="group__groups--layer-3">
                                    1
                                </div>
                            </div>
                        </div>

                    </div>
{/* 
                    <div className="group__groups--legend">
                        Home
                    </div> */}

                </li>

            </ul>

        </div>
    )
}

export default memo(Group)