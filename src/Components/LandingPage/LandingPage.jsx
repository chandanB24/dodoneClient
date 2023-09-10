import React from 'react'
import Hero from './Hero'
import Profile from './Profile'
import PostSection from './PostSection'

const LandingPage = () => {
  return (
    <div className='cotainer-fluid py-3'>
    <div className="row">
        <div className="col-lg-9 col-md-8 col-sm-12">
            <Hero/>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12">
            <Profile/>
        </div>
        <div className='col-12 mt-2'>
            <PostSection/>
        </div>
    </div>
</div>
  )
}

export default LandingPage