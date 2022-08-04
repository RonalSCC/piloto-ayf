import '../styles/Header.css';
export default function Header() {
  return (
    <>
        <div id='Header' className="container-fluid">
            <div className="row rowTitle">
                <div className='col-sm-1'>
                    <img className='imgLogo' src={'LogoAYF.png'} alt="" />
                </div>
                <div className="col-sm-9  position-relative">
                    <h1 className='titleHeader'>Administrativo y financiero</h1>
                </div>
                <div className='col-sm-2 containSearch'>
                    <div className='row'>
                        <h5 className='nameOfView'>Periodos contables</h5>
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
