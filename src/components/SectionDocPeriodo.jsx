import React, { useEffect, useState } from 'react'
import { getDocsPeriodos } from '../consumos/ConsultarDocsPeriodos';
import '../styles/SectionDocPeriodo.css';
import moment from 'moment';
import { ActualizarDocPeriodo } from '../consumos/ActualizarDocPeriodo';
import { ActualizarDocPeriodoAll } from '../consumos/ActualizarDocsPeriodoAll';

export default function SectionDocPeriodo({DataPeriodo, EventClose, EventSelectAdmin, EventChangeAlerts}) {
    
    let accionAWait =  "";
    const {PeriodoSelected} = DataPeriodo;
    const {ListTipoDocs} = DataPeriodo;
    const {perId = 0,FInicial = null,FFinal = null} = PeriodoSelected;
    const [filter, setFilter] = useState("");

    const ChangeFilter = (e) => {
        setTimeout(function(){
            setFilter(e.target.value);
        }, 500);
    };

    const CambiarEstadoTD = async(tpDID, estado)=> {
        let accionSend = estado == "A" ? "C": "A";
        const respuestaApi = await ActualizarDocPeriodo({
            empId: 1,
            PerId: perId,
            TPDID: tpDID,
            Accion: accionSend
        });

        if(respuestaApi?.ok){
            // console.log(respuestaApi.descripcion);
            let ListAlert = [{
                "title": "Actualización correcta",
                "desc":  respuestaApi.descripcion,
                "type": "alert-success"
            }];
            EventChangeAlerts(ListAlert);
            EventSelectAdmin({"perId":perId, "FInicial":FInicial, "FFinal": FFinal});
        }else{
            console.log(respuestaApi.errores)
        }
    };

    const Confirmar_AbrirCerrarTodosTD = (result)=>
    {
        if(result == true){
            AbrirCerrarTodosTD(accionAWait, result);
        }
    }

    const AbrirCerrarTodosTD = async (Accion, Confirmar)=>{
        const respuestaApi = await ActualizarDocPeriodoAll({
            PerId: perId,
            Accion: Accion,
            Confirm: Confirmar
        });

        if(respuestaApi?.ok){
            // console.log(respuestaApi.descripcion);
            let ListAlert = [{
                "title": "Actualización correcta",
                "desc":  respuestaApi.descripcion,
                "type": "alert-success"
            }];
            EventChangeAlerts(ListAlert);
            EventSelectAdmin({"perId":perId, "FInicial":FInicial, "FFinal": FFinal});
        }else{
            if(respuestaApi.errores){
                let arraySend = [];
                respuestaApi.errores.map((error) => {
                    const {codigo, descripcion} = error;
                    arraySend = [...arraySend, {
                        "title": `Error de validación (${codigo})`,
                        "desc": `${descripcion}, Desea continuar?`,
                        "decision": Confirmar_AbrirCerrarTodosTD
                    }]
                });
                accionAWait = Accion;
                EventChangeAlerts(arraySend);
            }
            // console.log(respuestaApi.errores)
        }
    }

    return (
        <>
            <div id='SectionDocPeriodo'>
                <div className='col-sm-12 align-items-center d-flex mb-3'>
                    <div className='col-sm-auto me-3'>
                        <i onClick={EventClose} className="fa-solid fa-arrow-left IconBackTD"></i>
                    </div>
                    <div className='col-sm-11'>
                        <div className='col-sm-12 mb-2'>
                            <h3 className='SectionDocsTitlePeriodo'><b className='PerTitle'>Periodo:</b> {`${moment(FInicial).format("DD/MM/yyyy")} - ${moment(FFinal).format("DD/MM/yyyy")}`}</h3>
                        </div>
                        <div className='col-sm-12 justify-content-between d-flex'>
                            <div className='col-sm-2 d-flex justify-content-between'>
                                <div onClick={() =>AbrirCerrarTodosTD("C")} className='col-sm-6 me-1 d-flex justify-content-center align-items-center CIconTDLock CIconAllTD mr-2'>
                                    <i  className="fa-solid fa-lock iconLockTD"  data-bs-toggle="tooltip" data-bs-placement="top" title="Cerrar todo"></i>
                                </div>
                                <div onClick={() =>AbrirCerrarTodosTD("A")} className='col-sm-6 d-flex justify-content-center align-items-center CIconTDUnLock CIconAllTD'>
                                    <i   className="fa-solid fa-lock-open iconUnlockTD" data-bs-toggle="tooltip" data-bs-placement="top" title="Abrir todo"></i>
                                </div>
                            </div>
                            
                            <div className='col-sm-9'>
                                <input onKeyUp={ChangeFilter} className='inputSearch' type="text" placeholder='Buscar...'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='ContainerTipoDocs scrollAYF'>   
                {
                    ListTipoDocs.filter((fil)=> 
                                            fil.tpDDesc.toLowerCase().includes(filter.toLowerCase()) || 
                                            fil.tpDID.toLowerCase().includes(filter.toLowerCase())
                                        ).map(({tpDID, tpDDesc, estado}) => 
                        <div key={tpDID} className='col-sm-12 d-flex align-items-center CardTipoDocs'> 
                            <div onClick={() => CambiarEstadoTD(tpDID, estado)} className={"col-sm-1 d-flex justify-content-center ContainerIconTD " + (estado == "C" ? "CIconTDLock": "CIconTDUnLock")}>
                                {estado == "C" ? <i className="fa-solid fa-lock iconLockTD"></i> : <i className="fa-solid fa-lock-open iconUnlockTD"></i>}
                            </div>
                            <div className='col-sm-10'>
                                <p className='txtDescTD'>{tpDDesc}</p>
                            </div>
                            <div className='col-sm-1'>
                                <p className='txtIDTD'>{tpDID}</p>
                            </div>
                             
                        </div>
                    )
                }
                </div>
            </div>
        </>
    )
}
