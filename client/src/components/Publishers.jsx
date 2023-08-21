import React from "react";
import logo4 from '../assets/images/oldline.avif'
import logo5 from '../assets/images/peagent.png'
import logo6 from '../assets/images/riverlights.png'


const Publishers = () => {
    const logos =[logo4, logo5, logo6,logo4, logo5, logo6]
  return (
    <div className="h-36 flex justify-between">
        {logos.map((logo,i)=>(
            <img key={i} className="logo h-full w-44 bg-[#f0f0f0]" src={logo} alt='publisher logos'/>
        ))}
    </div>
  )
};

export default Publishers;
