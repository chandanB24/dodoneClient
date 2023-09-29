import React from 'react'
import EndUserProfile from './EndUserProfile'
import EndUserPostSection from './EndUserPostSection'
import EndUserHero from './EndUserHero'

const EndUser = () => {
  return (
    <div className='cotainer-fluid py-3'>
    <div className="row">
        <div className="col-lg-9 col-md-8 col-sm-12">
            <EndUserHero/>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12">
            <EndUserProfile/>
        </div>
        <div className='col-12 mt-2'>
            <EndUserPostSection/>
        </div>
    </div>
</div>
  )
}

export default EndUser