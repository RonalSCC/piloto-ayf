import { useEffect, useState } from 'react';
import '../styles/components/Alert.css';
export default function Alert({ListData, ChangeAlerts}) {

    const RemoveItem = (index)=> {
        const newArray = [...ListData];
        newArray.splice(index, 1);
        ChangeAlerts(newArray);
    }
  return (
    <>
        <div className="col-sm-3 ContainerAlerts">
            {
                ListData.map(({title, desc, decision, type} , index)=> 
                    <div key={index} className={"col-sm-12 d-flex ItemAlert "+ (type != null ? type : "alert-info") +" "+ (decision ? " ItemAlertDecision": "")}>
                        <div className='col-sm-2 ContainerImgAlert'>
                            {
                                type == "alert-error" ? <i className="fa-solid fa-circle-xmark IconTypeAlert"></i>
                               :type == "alert-success" ? <i className="fa-solid fa-circle-check IconTypeAlert"></i>
                               :type == "alert-info" ? <i className="fa-solid fa-circle-exclamation IconTypeAlert"></i>
                               :type == "alert-warning" ? <i className="fa-solid fa-triangle-exclamation IconTypeAlert"></i>

                               :<i className="fa-solid fa-circle-exclamation IconTypeAlert"></i>
                            }
                            {/*  */}
                            {/*  */}
                            {/* <img className='imgAlert' src={'LogoAYF.png'} alt="" /> */}
                            
                        </div>
                        <div className='col-sm-10 ContainerInfoAlert'>
                            <div className='col-sm-12 d-flex flex-wrap h-100'>
                                <div className='col-sm-12 CTitleAlert'>
                                    <h3 className='titleAlert'>{title}</h3>
                                </div>
                                
                                <div className={"col-sm-12 h-60 CDescAlert scrollAYF " + (decision && "CDescAlertDecision")}>
                                    <p className='descAlert'>{desc}</p>
                                </div>
                                
                                <div className={"col-sm-12 d-flex " + (!decision ? "d-none": "")}>
                                    <div className='col-sm-4'>
                                        <button onClick={() => {decision(true); RemoveItem(index);}} className='btnAlertDecision btnAlertConfirm '>SI</button>
                                    </div>
                                    <div className='col-sm-4'>
                                        <button onClick={() => {decision(false); RemoveItem(index);}} className='btnAlertDecision btnAlertDecline'>NO</button>
                                    </div>
                                </div>
                            </div>

                            <div  onClick={() =>  RemoveItem(index)} className='col-sm-auto CloseAlert'>
                                <i className="fa-solid fa-circle-xmark"></i>
                            </div>

                            
                        </div>
                    </div>
                )
            }
        </div>
    </>
  )
}
