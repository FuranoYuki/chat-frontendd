// dependencies
import React, { memo } from 'react'

// external files
import './OnlineFriend.css'

const OnlineFriend = (props) => {
  return (
        <div className="OnlineFriend">

            <div className="onlineFriend-nofriend">
                <div className="onlineFriend-nofriend-img">

                </div>
                <div className="onlineFriend-nofriend-text">
                    No one&apos;s around to play with Wumpus.
                </div>
            </div>

        </div>
  )
}

export default memo(OnlineFriend)
