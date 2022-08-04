import '../../styles/Modal.css';

export default function ModalEditarConsecutivo({objEdit,EventSaveConsecutivo}) {

    const changeConsecutivoIni = (event, element) =>{
        element.cnsIni = event.target.value;
    }

    const changeConsecutivoFin = (event, element) =>{
        element.cnsFin = event.target.value;
    }

    const InValidELetter = (event)=> {
        if (event.keyCode == 69) {
            return event.preventDefault();
        }
    }

  return (
    <>
        <div className="modal fade" id="ModalEditarConsecutivo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header ModalHeaderAYF d-flex flex-column justify-content-center position-relative align-items-center">
                        <h4 className="modal-title" id="exampleModalLabel">Editar consecutivo</h4>
                        <p className="txtInfoNew text-center txtSubTitle">{objEdit.tpDDesc && objEdit.tpDDesc}</p>
                        <div className="col-sm-auto CCloseButtonModal">
                            <i type="button" data-bs-dismiss="modal" data-bs-target="#ModalEditarConsecutivo" aria-label="Close" className="fa-solid fa-circle-xmark IconCloseModal"></i>
                        </div>
                    </div>
                    <div className="modal-body">
                        <form id="FormEditConsecutivo">
                            <div className="col-sm-12 d-flex justify-content-center">
                                <div className="col-sm-auto colOptionNew">
                                    <div className="input-group">
                                        <label htmlFor="">Consecutivo inicial</label>
                                        <input 
                                            className={"inputConsecutivo InputActiveDGConsecutivo"}
                                            type="number" 
                                            onChange={(event) => changeConsecutivoIni(event,objEdit)}
                                            defaultValue={objEdit.cnsIni && objEdit.cnsIni}
                                            onKeyDown={InValidELetter}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-auto colOptionNew">
                                    <div className="input-group">
                                        <label htmlFor="">Consecutivo final</label>
                                        <input 
                                            className={"inputConsecutivo InputActiveDGConsecutivo"}
                                            type="number" 
                                            onChange={(event) => changeConsecutivoFin(event,objEdit)}
                                            defaultValue={objEdit.cnsFin && objEdit.cnsFin}
                                            onKeyDown={InValidELetter}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className='modal-footer'>   
                        <button onClick={() => EventSaveConsecutivo(objEdit)} className='btnAYF btnAYFBase'>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
