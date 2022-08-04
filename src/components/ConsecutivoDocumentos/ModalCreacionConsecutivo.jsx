import { useEffect } from "react";
import { useState } from "react";
import Combobox from "../Combobox";

export default function ModalCreacionConsecutivo({DataTipoDoc, EventSaveConsecutivo}) {

    const [TipoDocSelecNew, setTipoDocSelecNew] = useState(null);
    const [ConsecutivoInicialNew, setConsecutivoInicialNew] = useState(null);
    const [ConsecutivoFinalNew, setConsecutivoFinalNew] = useState(null);
    
    const InValidELetter = (event)=> {
        if (event.keyCode == 69) {
            return event.preventDefault();
        }
    }

    const SetValueConsIniNew = (event) => {
        InValidELetter(event);
        var value = event.target.value;
        setConsecutivoInicialNew(value);
    }

    const SetValueConsFinNew = (event) => {
        InValidELetter(event);
        var value = event.target.value;
        setConsecutivoFinalNew(value);
    }

    const SelectTipoDocNew = (obj) =>{
        setTipoDocSelecNew(obj);
    }

    useEffect(() => {
        setTipoDocSelecNew(null);
        setConsecutivoInicialNew(null);
        setConsecutivoFinalNew(null);

    }, [DataTipoDoc])
    
  return (
    <>
        <div className="modal fade" id="ModalNuevoConsecutivo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header ModalHeaderAYF d-flex flex-column justify-content-center position-relative align-items-center">
                        <h4 className="modal-title" id="exampleModalLabel">Nuevo consecutivo</h4>
                        <p className="txtInfoNew text-center txtSubTitle">Por favor diligencie los datos para el registro </p>
                        <div className="col-sm-auto CCloseButtonModal">
                            <i type="button" data-bs-dismiss="modal" data-bs-target="#ModalNuevoConsecutivo" aria-label="Close" className="fa-solid fa-circle-xmark IconCloseModal"></i>
                        </div>
                    </div>
                    <div className="modal-body d-flex justify-content-center">
                        <div className="col-sm-10 d-flex justify-content-center">
                            <div className="col-sm-4 colOptionNew">
                                <div className="input-group w-100">
                                    <Combobox 
                                        ID="ComboTipoDocNew" 
                                        Data={DataTipoDoc}
                                        Name="Tipo Documento"
                                        params={
                                            {
                                                ID: "tpDID", 
                                                Text: "concatName",
                                                onSelectEvent: SelectTipoDocNew
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4 colOptionNew">
                                <div className="input-group w-100">
                                    <label htmlFor="">Consecutivo inicial</label>
                                    <input 
                                        className='inputConsecutivoNew' 
                                        type="number" 
                                        onKeyUp={SetValueConsIniNew}
                                        disabled={TipoDocSelecNew?.tpDConsMes == 1 ? true:false}
                                        defaultValue={ConsecutivoInicialNew}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4 colOptionNew">
                                <div className="input-group w-100">
                                    <label htmlFor="">Consecutivo final</label>
                                    <input 
                                        className='inputConsecutivoNew' 
                                        type="number" 
                                        onKeyUp={SetValueConsFinNew}
                                        disabled={TipoDocSelecNew?.tpDConsMes == 1 ? true:false}
                                        defaultValue={ConsecutivoFinalNew}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='modal-footer'>   
                        <button 
                                onClick={() => EventSaveConsecutivo({
                                                ConsecutivoInicial: ConsecutivoInicialNew,
                                                ConsecutivoFinal: ConsecutivoFinalNew,
                                                TipoDocSelecNew: TipoDocSelecNew
                                            })} 
                                className='btnAYF btnAYFBase'
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
