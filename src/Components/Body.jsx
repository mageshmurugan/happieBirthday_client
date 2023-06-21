import React from 'react'
import body2 from '../Resources/body2.jpg'

function Body() {
  return (
    <section className="body1">
    <div className="body1-1">
        <div className="body1-1-1">
            <h1>Never Miss a Birthday</h1>
            <p> With the Birthday Mail Sender, you can ensure that every birthday is acknowledged and celebrated.Eliminate the risk of forgetting or overlooking important birthdays by relying on the automated system to send timely and accurate birthday wishes.</p>
        <p> Show your friends, family, or customers that you care by sending them heartfelt birthday wishes.
            Nurture and strengthen your relationships by consistently acknowledging and celebrating important milestones like birthdays.
         </p>
        </div>
        <div className="body1-1-2">
            <img src={body2} alt=""/>
        </div>
    </div>
</section>
  )
}

export default Body
