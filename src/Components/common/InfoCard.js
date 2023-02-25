import React from 'react'
import '../Landingpage/landingpage.css'
function InfoCard({title, subtitle, icon}) {
  return (
    <div className="info-card">
      <div className="info-card-icon">
        <img
        src={icon}
        alt="icon"
        />
        </div>
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
  )
}

export default InfoCard