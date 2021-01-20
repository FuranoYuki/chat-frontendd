import React, {memo} from 'react';

//style
import './Pedding.css';

//components
import View from './view/View';
import Message from './message/Message';


const Pending = ({pending}) => {

    // -- JSX --

    return(
        <div className="Pedding">
            {   
                pending.length > 0 ?

                    <View pending={pending} />
                :   
                    <Message />
            }
        </div>
    )
}

export default memo(Pending);