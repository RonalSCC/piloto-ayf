import '../../styles/Header.css';
export default function HeaderMaestros({txtTitle = "", txtSubtitle=""}) {
  return (
    <>
        <div id='Header' className="container-fluid">
            <div className="row rowTitle">
                <div className='col-sm-1'>
                    <img className='imgLogo' src={'LogoAYF.png'} alt="" />
                </div>
                <div className="col-sm-9  position-relative">
                    <div className='col-sm-12'>
                        <h1 className='titleHeader'>{txtTitle}</h1>
                    </div>
                    <div className='col-sm-12'>
                        <p className='complementHeaderText'>
                            <b>DEMO SAS</b>  - <b>NIT:</b>  85,133,458  
                        </p>
                    </div>
                </div>
                <div className='col-sm-2 containSearch'>
                    <div className='row'>
                        <div className='col-sm-9'>
                            <h5 className='nameOfView'>{txtSubtitle}</h5>
                        </div> 
                    </div>
                </div>
            </div>
            <div className='col-sm-auto CButtonBack'>
                {/* <button className='CircleButton btnBack'> */}
                    <i class="fa-solid fa-reply IconBtnBack"></i>
                {/* </button> */}
            </div>
        </div>
    </>
  )
}
