import React, { useEffect, useState } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Settings = () => {
    const { pageId } = useParams();
    const [pageTitle, setPageTitle] = useState('');
    const [cardsPerRow, setCardsPerRow] = useState(2);
    const [showHero, setShowHero] = useState(true);
    const [showProfile, setShowProfile] = useState(true);
    const [flatCard, setFlatCard] = useState(false); 
    const [timeStamp, setTimeStamp] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/getPageSettings/${pageId}`);
                if (res.data) {
                    setPageTitle(res.data.page_title);
                    setCardsPerRow(parseInt(res.data.cards_per_row));
                    setShowHero(res.data.hero === '1');
                    setShowProfile(res.data.profile === '1');
                    setFlatCard(res.data.flat_card === '1');
                    setTimeStamp(res.data.time_stamp === '1');
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [pageId]);

    const handleSaveClick = async () => {
                const res = await axios.post('http://localhost:8080/api/updatePage',{pid:pageId,pageTitle})
                if(res){
                    console.log(res.data);
                }
          };

    const handleClick = async () => {
        const updatedSettings = {
            pid: pageId,
            cardsPerRow: cardsPerRow,
            hero: showHero ? true : false,
            profile: showProfile ? true : false,
            flatCard: flatCard ? true : false,
            timeStamp: timeStamp ? true : false
        };

        try {
            const res = await axios.post('http://localhost:8080/api/createPageSetting', updatedSettings);
            if (res) {
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container-fluid p-2 p-md-3 p-lg-5 mb-3'>
            <h5>Page Settings</h5>
            <div className='form-group col-12 col-md-8 col-lg-6 d-flex mb-3'>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Page Title"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                />
                <button className="btn btn-danger mx-2" onClick={handleSaveClick}>
                    Save
                </button>
            </div>
            <div className="form-group col-12 col-md-8 col-lg-6 mb-3">
                <label htmlFor="cardsPerRow"><h6>No. of Cards per Row</h6></label>
                <select
                    className="form-control"
                    id="cardsPerRow"
                    value={cardsPerRow}
                    onChange={(e) => setCardsPerRow(parseInt(e.target.value))}
                >
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
            </div>
            {/* Toggle switches */}
            <div className='form-group col-12 col-md-8 col-lg-6 d-flex mb-3'>
                <h6 className='mx-2 fw-medium'>Show Hero</h6>
                <BootstrapSwitchButton checked={showHero} onstyle="success" offstyle='danger' size="xs" onChange={() => setShowHero(!showHero)} />
            </div>
            <div className='form-group col-12 col-md-8 col-lg-6 d-flex mb-3'>
                <h6 className='mx-2 fw-medium'>Show Profile</h6>
                <BootstrapSwitchButton checked={showProfile} onstyle="success" offstyle='danger' size="xs" onChange={() => setShowProfile(!showProfile)} />
            </div>
            <div className='form-group col-12 col-md-8 col-lg-6 d-flex mb-3'>
                <h6 className='mx-2 fw-medium'>Flat Card</h6>
                <BootstrapSwitchButton checked={flatCard} onstyle="success" offstyle='danger' size="xs" onChange={() => setFlatCard(!flatCard)} />
            </div>
            <div className='form-group col-12 col-md-8 col-lg-6 d-flex mb-3'>
                <h6 className='mx-2 fw-medium'>Time Stamp</h6>
                <BootstrapSwitchButton checked={timeStamp} onstyle="success" offstyle='danger' size="xs" onChange={() => setTimeStamp(!timeStamp)} />
            </div>
            <button className="btn btn-danger mx-2" onClick={handleClick}>
             Save
             </button>
        </div>
    );
}

export default Settings;
