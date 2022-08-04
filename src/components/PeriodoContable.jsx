
import DataGrid from "./DataGrid";
import Header from "./Header";
import HeaderMaestros from "./Maestros/HeaderMaestros";
import SectionDocPeriodo from "./SectionDocPeriodo";
import ModalLogs from "./ModalLogs";
import ModalNewPeriodo from "./ModalNewPeriodo";
import Alert from "./Alert";

import {getPeriodosContables} from '../consumos/ConsultarPeriodosContables.js';
import { getDocsPeriodos } from '../consumos/ConsultarDocsPeriodos';
import { getLogsPeriodosContables } from "../consumos/ConsultarLogsPeriodosContables";
import { useEffect, useState } from "react";
import '../styles/PeriodoContable.css';
import useScript from "../hooks/useScript";
import * as bootstrap from 'bootstrap'
import { Actualizar_PeriodoContable } from "../consumos/Actualizar_PeriodoContable";
import { Eliminar_PeriodoContable } from "../consumos/Eliminar_PeriodoContable";

export function PeriodoContable() {

    let periodoAwait = null;
    let fieldAwait = null;

    useScript('../frameworks/bootstrap/js/bootstrap.bundle.js');
      
    const [datos, setDatos] = useState([]);
    const [infoPeriodo, setInfoPeriodo] = useState({PeriodoSelected: {}, ListTipoDocs: []});
    const [dataPeriodo, setDataPeriodo] = useState({});
    const [tipoDocsOn, setTipoDocsOn] = useState(false);
    const [historialCambios, setHistorialCambios] = useState([]);
    const [ListAlert, setListAlert] = useState([]);
    const [AnioSelected, setAnioSelected] = useState(null);
    let [ModalCreate, setModalCreate] = useState(null);
    let FilterYears = [];
    let CurentYear = new Date().getFullYear();
    for (let i = 0; i < 6; i++) {
        let txtTemp = CurentYear - i;
        FilterYears = [...FilterYears, {
            "Text": `${txtTemp} en adelante`,
            "Ano":txtTemp
        }];
    }

    const OnSelect = async(info) => {
        if(info)
        {
            const {perId} = info;
            // setDataPeriodo(info);
            const listTipoDocsPorPer = await getDocsPeriodos(perId);
            var objPeriodoAll = {
                PeriodoSelected:info,
                ListTipoDocs: listTipoDocsPorPer
            };
            setInfoPeriodo(objPeriodoAll);
            setTipoDocsOn(true);
            document.getElementById('SectionDocPeriodo').classList.add('SectionDocShow');
        }
        
    };

    const CloseDocsPeriodos = () => {
        setTipoDocsOn(false);
        document.getElementById('SectionDocPeriodo').classList.remove('SectionDocShow');
    }

    const getData = async(Ano = null)=>{
        const dataReturn = await getPeriodosContables(Ano);
        setDatos(dataReturn);
    }

    useEffect(() => {
        getData();
        // instanceTooltips();
    }, []);

    const AbrirModal = async() => {
        const dataLogs = await getLogsPeriodosContables();
        setHistorialCambios(dataLogs);
        new bootstrap.Modal(document.getElementById('ModalLogs')).show();
    };

    const CloseModal = () => {
        new bootstrap.Modal(document.getElementById('ModalLogs')).hide();
    }
    const FilterYear = (e) => {
        setAnioSelected(e.target.value);
        getData(e.target.value)
    };

    const ShowAlerts = (array)=> {
        setListAlert(array);
    }

    const ChangeEstado = async(objPeriodo, field, Confirm)=>{

        objPeriodo[field] = objPeriodo[field] == "C" ? "A": "C";
        objPeriodo.confirm = Confirm;
        periodoAwait = objPeriodo;
        fieldAwait = field;
        const respuestaApi = await Actualizar_PeriodoContable(objPeriodo);

        if(respuestaApi?.ok){
            let ListAlert = [{
                "title": "Actualización correcta",
                "desc":  respuestaApi.descripcion,
                "type": "alert-success"
            }];
            ShowAlerts(ListAlert);
            getData(AnioSelected);
        }else{
            if(respuestaApi.errores){
                objPeriodo[field] = objPeriodo[field] == "C" ? "A": "C";
                let arraySend = [];
                respuestaApi.errores.map((error) => {
                    const {codigo, descripcion} = error;

                    if (error.codigo == "510") {
                        arraySend = [...arraySend, {
                            "title": `Error de validación (${codigo})`,
                            "desc": `${descripcion}, Desea continuar?`,
                            "decision": Confirm_ChangeEstado
                        }]
                    }else{
                        arraySend = [...arraySend, {
                            "title": `Error de validación (${codigo})`,
                            "desc": `${descripcion}`,
                        }]
                    }
                    
                });
                ShowAlerts(arraySend);
            }
            console.log(respuestaApi.errores);
        }
    }

    const Confirm_ChangeEstado = (result)=>{
        if (result) {
            periodoAwait.Confirm = true;
            ChangeEstado(periodoAwait,fieldAwait, true);
        }
    }

    const AbrirModalNuevoPeriodo = () => {
        ModalCreate = new bootstrap.Modal(document.getElementById('ModalNewPeriodo'));
        setModalCreate(ModalCreate);
        ModalCreate.show();
    }

    const EliminarPeriodo = async({perCartera,perContabilidad, perEmpresa, perEstado, perEstadoContab, perFF, perFI, perId, perLiquidacion, perPAAG, perSS, perTesoreria}) => {

        const objSend = {
            PerId : perId,
            PerFI : perFI,
            PerFF : perFF,
            PerPAAG : perPAAG,
            PerEstado : perEstado,
            PerEstadoContab : perEstadoContab,
            PerContabilidad : perContabilidad,
            PerTesoreria : perTesoreria,
            PerSS : perSS,
            PerCartera : perCartera,
            PerLiquidacion : perLiquidacion,
            PerEmpresa : perEmpresa
        };
        const respuestaApi = await Eliminar_PeriodoContable(objSend);
        if(respuestaApi?.ok){
            getData(AnioSelected);
        }else{
            if(respuestaApi.errores){
                let arraySend = [];
                respuestaApi.errores.map((error) => {
                    const {codigo, descripcion} = error;
                    arraySend = [...arraySend, {
                        "title": `Error de validación (${codigo})`,
                        "desc": `${descripcion}, Desea continuar?`,
                    }];
                });
                ShowAlerts(arraySend);
            }
        }
    }

    return (
        <div className="pb-3">
            <HeaderMaestros 
                txtTitle="Periodos Contables"
                txtSubtitle="AYF"
            />
            
            <div className={"col-sm-12 pe-3 ps-3 mt-2 mb-2 d-flex position-relative " + (tipoDocsOn ? "justify-content-end": "justify-content-center")}>
                <div className={tipoDocsOn ? "col-sm-8" : "col-sm-11"}>
                    <div className="col-sm-12 d-flex mb-2 justify-content-between align-items-center">
                        <div className="col-sm-3 d-flex flex-column">
                            <label className="ps-1" htmlFor="">Año</label>
                            <select onChange={(e) => FilterYear(e)} name="YearFilter" id="YearFilter">
                                <option value="">Todos</option>
                                {
                                    FilterYears.map(({Ano, Text}) => 
                                        <option key={Ano} value={Ano}>{Text}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-sm-auto me-3">
                            <button data-bs-toggle="tooltip" data-bs-placement="left" title="Nuevo periodo" onClick={AbrirModalNuevoPeriodo}  className="btn CircleButton btnHistory me-2">
                                <i className="fa-solid fa-circle-plus"></i>
                            </button>

                            <button data-bs-toggle="tooltip" data-bs-placement="left" title="Ver Logs" onClick={AbrirModal} className="btn CircleButton btnHistory">
                                <i className="fa-solid fa-file"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <DataGrid 
                            Datos={datos}
                            TipoDocsOn={tipoDocsOn}
                            EventChange={OnSelect}
                            ChangeEstado={ChangeEstado}
                            EventEliminarPeriodo={EliminarPeriodo}
                        />
                    </div>
                    
                </div>
                <SectionDocPeriodo 
                    DataPeriodo={infoPeriodo} 
                    EventClose={CloseDocsPeriodos} 
                    EventSelectAdmin={OnSelect}
                    EventChangeAlerts={ShowAlerts}
                />
            </div>
            <ModalLogs HistorialCambios={historialCambios}/>
            <ModalNewPeriodo EventLoadData={getData} objModal={ModalCreate} ChangeAlerts={ShowAlerts}/>
            <Alert ListData={ListAlert} ChangeAlerts={ShowAlerts}/>
        </div>
    )
}
