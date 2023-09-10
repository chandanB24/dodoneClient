import React from 'react'
import bgImg from '../../assets/bg.png'

const Hero = () => {
  return (
   <div className="card d-flex justify-content-center align-items-start shadow-lg mb-3" style={{padding:'20px',minHeight:'50vh',backgroundImage:`url(${bgImg})`,border:'none'}}>
    <div className="card shadow-lg p-3 col-lg-5 col-sm-12" style={{background:"#ffffff",border:"none"}}>
        <div className="card-text p-1 fw-bold mb-2" style={{color:"darkblue",fontSize:"18px"}}>
            Recent Posts
        </div>
    <div className="card-body p-0">
      <h4 className='card-title' style={{fontFamily:'Poppins',fontWeight:'lighter 300',color:'#18181B'}}>Coffee The Relaxing Mind</h4>
      <p className='card-text ' style={{fontFamily:"Poppins",fontSize:"16px",fontWeight:'Extralight 200',color:'#71717A'}}>Indulging in a warm cup of coffee is like a soothing embrace for the mind, gently unraveling tension and infusing tranquility with every sip. Its rich aroma and comforting taste create a brief oasis of relaxation amidst the bustling rhythms </p>
    </div>
    <hr />
    <div className="card-footers">
        <p className='fw-bold fs-6' style={{color:"#A1A1AA"}}>Posted 3min ago</p>
    </div>
    </div>
</div>
  )
}

export default Hero