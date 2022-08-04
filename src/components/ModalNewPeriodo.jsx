import '../styles/components/ModalNewPeriodo.css';
import '../styles/Modal.css';
import $ from "jquery";
import { useState } from 'react';
import { Crear_PeriodoContable } from '../consumos/Crear_PeriodoContable';
import * as bootstrap from 'bootstrap'

export default function ModalNewPeriodo({EventLoadData, ChangeAlerts, objModal}) {

    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [periodoCont, setPeriodoCont] = useState("C");
    const [Cartera, setCartera] = useState("C");
    const [Contabilidad, setContabilidad] = useState("C");
    const [Tesoreria, setTesoreria] = useState("C");
    const [SeguridadSocial, setSeguridadSocial] = useState("C");
    const [Liquidaciones, setLiquidaciones] = useState("C");

    const GuardarPeriodoContable = async() => 
    {
        if (fechaInicial && fechaFinal) {
            var objInsert = {
                PerFI: fechaInicial,
                PerFF:fechaFinal,
                PerPAAG: 0,
                PerEstado: 0,
                PerEstadoContab: periodoCont,
                PerCartera: Cartera,
                PerContabilidad: Contabilidad,
                PerTesoreria: Tesoreria,
                PerSS: SeguridadSocial,
                PerLiquidacion: Liquidaciones,
                PerEmpresa: 1
            };

            var response = await Crear_PeriodoContable(objInsert);

            if(response?.ok){
                EventLoadData();
                objModal.hide();
            }else{
                if(response.errores){
                    let arraySend = [];
                    response.errores.map((error) => {
                        const {codigo, descripcion} = error;
                        debugger
                        arraySend = [...arraySend, {
                            "title": `Error de validación (${codigo})`,
                            "desc": `${descripcion}`,
                            "type": "alert-error"
                        }];
                    });
                    ChangeAlerts(arraySend);
                }
            }
        }else{
            let arraySend = [{
                "title": `Error de validación`,
                "desc": `Debe seleccionar una fecha inicial y final para la creción del periodo`,
                "type": "alert-error"
            }];
            ChangeAlerts(arraySend);
        }
        
    }
  return (
    <>
        <div className="modal fade" id="ModalNewPeriodo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header ModalHeaderAYF d-flex flex-column justify-content-center position-relative align-items-center">
                        <h4 className="modal-title" id="exampleModalLabel">Nuevo periodo</h4>
                        <p className="txtInfoNew text-center txtSubTitle">Por favor diligencie los datos para el registro</p>
                        <div className="col-sm-auto CCloseButtonModal">
                            <i type="button" data-bs-dismiss="modal" data-bs-target="#ModalNewPeriodo" aria-label="Close" className="fa-solid fa-circle-xmark IconCloseModal"></i>
                        </div>
                    </div>
                    <div className="modal-body">
                        <form id="FormNewPeriodo">
                            <div className="col-sm-12 d-flex justify-content-center">
                                <div className="col-sm-auto colOptionNew">
                                    <div className="input-group">
                                        <label htmlFor="">Fecha inicial</label>
                                        <input type="date" required placeholder="Fecha inicial" value={fechaInicial} onChange={(e) => setFechaInicial(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-sm-auto colOptionNew">
                                    <div className="input-group">
                                        <label htmlFor="">Fecha final</label>
                                        <input type="date" required placeholder="Fecha final" min={fechaInicial} value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)}/>
                                    </div>
                                </div>

                                <div className="col-sm-auto colOptionNew">
                                    <div className="input-group d-flex flex-column ">
                                        <label htmlFor="">Periodo</label>
                                        <div className="col-sm-12 pt-2 d-flex justify-content-center ">
                                            <input type="checkbox" value={periodoCont} hidden/>
                                            {
                                                <i className={"fa-solid " + (periodoCont == "C" ? "fa-lock iconLock": "fa-lock-open iconUnlock")} onClick={(e) => setPeriodoCont(periodoCont == "C"? "A": "C")}></i> 
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-auto colOptionNew">
                                    <div className="input-group d-flex flex-column ">
                                        <label htmlFor="">Cartera</label>
                                        <div className="col-sm-12 pt-2 d-flex justify-content-center ">
                                            <input type="checkbox" value={Cartera} hidden/>
                                            {
                                                <i className={"fa-solid " + (Cartera == "C" ? "fa-lock iconLock": "fa-lock-open iconUnlock")} onClick={(e) => setCartera(Cartera== "C"? "A": "C")}></i> 
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-auto colOptionNew">
                                    <div className="input-group d-flex flex-column ">
                                        <label htmlFor="">Contabilidad</label>
                                        <div className="col-sm-12 pt-2 d-flex justify-content-center ">
                                            <input type="checkbox" value={Contabilidad} hidden/>
                                            {
                                                <i className={"fa-solid " + (Contabilidad == "C" ? "fa-lock iconLock": "fa-lock-open iconUnlock")} onClick={(e) => setContabilidad(Contabilidad == "C"? "A": "C")}></i> 
                                            }
                                        </div>
                                        {/* <i className="fa-solid fa-lock-open iconUnlock"></i> */}
                                    </div>
                                </div>
                                <div className="col-sm-auto colOptionNew">
                                    <div className="input-group d-flex flex-column ">
                                        <label htmlFor="">Tesorería</label>
                                        <div className="col-sm-12 pt-2 d-flex justify-content-center ">
                                            <input type="checkbox" value={Tesoreria} hidden/>
                                            {
                                                <i className={"fa-solid " + (Tesoreria == "C" ? "fa-lock iconLock": "fa-lock-open iconUnlock")} onClick={(e) => setTesoreria(Tesoreria == "C"? "A": "C")}></i> 
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-auto colOptionNew">
                                    <div className="input-group d-flex flex-column ">
                                        <label htmlFor="">Seguridad Social</label>
                                        <div className="col-sm-12 pt-2 d-flex justify-content-center ">
                                            <input type="checkbox" value={SeguridadSocial} hidden/>
                                            {
                                                <i className={"fa-solid " + (SeguridadSocial == "C" ? "fa-lock iconLock": "fa-lock-open iconUnlock")} onClick={(e) => setSeguridadSocial(SeguridadSocial == "C"? "A": "C")}></i> 
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-auto colOptionNew">
                                    <div className="input-group d-flex flex-column ">
                                        <label htmlFor="">Liquidaciones</label>
                                        <div className="col-sm-12 pt-2 d-flex justify-content-center ">
                                            <input type="checkbox" value={Liquidaciones} hidden/>
                                            {
                                                <i className={"fa-solid " + (Liquidaciones == "C" ? "fa-lock iconLock": "fa-lock-open iconUnlock")} onClick={(e) => setLiquidaciones(Liquidaciones == "C"? "A": "C")}></i> 
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className='modal-footer'>   
                        <button onClick={GuardarPeriodoContable} className='btnAYF btnAYFBase'>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
