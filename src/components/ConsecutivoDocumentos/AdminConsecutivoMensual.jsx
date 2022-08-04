
import { useEffect, useState } from 'react';
import { Consultar_ConsecutivoMesAno } from '../../consumos/ConsecutivoDocumentos/Consultar_ConsecutivoMesAno';
import { Guardar_MesesConsecutivos } from '../../consumos/ConsecutivoDocumentos/Guardar_MesesConsecutivos';
import { Consultar_Meses } from '../../consumos/Generales/Consultar_Meses';
import '../../styles/components/ConsecutivoDocumentos/AdminConsecutivoMensual.css';
import Combobox from '../Combobox';
import * as bootstrap from 'bootstrap'
import $ from "jquery";

export default function AdminConsecutivoMensual({ConsecutivoSelected = {}, EventAlerts}) {
    
    const {sucDesc, tpDDesc, cnsId, cnsSucursal, tpDID} = ConsecutivoSelected || {};
    const [Anos, setAnos] = useState([])
    const [MesesC, setMesesC] = useState([])
    const [AnoMesesC, setAnoMesesC] = useState(null);
    let [ListTooltip, setListTooltip] = useState([]);
    const getMesesConsecutivo = async() => {
        if (cnsId) {
            const response = await Consultar_ConsecutivoMesAno({cnsId: cnsId});
            if(response?.ok){
                setAnos(response.datos);
                setMesesC([]);
                response.datos.map((y) => {
                    if (AnoMesesC != null) {
                        if (y.ano == AnoMesesC) {
                            setMesesC(y.mesesC);
                        }
                    }else if (y.ano == new Date().getFullYear()) {
                        setMesesC(y.mesesC);
                    }   
                })

            }else{
                if(response.errores){
                    let arraySend = [];
                    response.errores.map((error) => {
                        const {codigo, descripcion} = error;
                        arraySend = [...arraySend, {
                            "title": `Error de validación (${codigo})`,
                            "desc": `${descripcion}`,
                            "type": "alert-error"
                        }];
                    });
                    EventAlerts(arraySend);
                }
            }
        }
        
    }

    useEffect(()=> {
        getMesesConsecutivo();
    }, [ConsecutivoSelected]);

    const ChangeYearConsecutivoMes = ({ano,mesesC}) =>{
        setMesesC([]);
        if (mesesC) {
            setTimeout(function(){
                setAnoMesesC(ano);
                setMesesC([...mesesC]);
            },100);
        }
    }

    const Autocompletar = ()=>{
        if (MesesC && AnoMesesC) {
            setMesesC([]);
            var MesesChange = [...MesesC];
            MesesChange.map((m) => {
                m.consecutivoInicial = `${AnoMesesC}${m.mesId< 10 ? "0"+m.mesId : m.mesId}0001`;
                m.consecutivoFinal = `${AnoMesesC}${m.mesId< 10 ? "0"+m.mesId : m.mesId}9999`; 
            });

            setTimeout(function(){
                setMesesC(MesesChange);
            },100);
        }
    }

    const AutocompletarMin = ()=>{
        if (MesesC && AnoMesesC) {
            setMesesC([]);
            var MesesChange = [...MesesC];
            MesesChange.map((m) => {
                m.consecutivoInicial = `${AnoMesesC.toString().substring(2, 4)}${m.mesId< 10 ? "0"+m.mesId : m.mesId}0001`;
                m.consecutivoFinal = `${AnoMesesC.toString().substring(2, 4)}${m.mesId< 10 ? "0"+m.mesId : m.mesId}9999`; 
            });

            setTimeout(function(){
                setMesesC(MesesChange);
            },100);
        }
    }

    const changeInputConMesIni = (element, event)=>{
        disabledSaveMeses(true);

        setTimeout(function(){
            if (event) {
                var valueInput = event.target.value;
                if (valueInput > 2140000000) {
                    event.target.style.background = "var(--colorBase)";
                    event.target.style.color = "white";
                    event.target.value =2140000000; 
                    element.consecutivoInicial = 2140000000;
                    setTimeout(function(){
                        event.target.style.background = "white";
                        event.target.style.color = "black";
                    }, 400);
                }else{
                    element.consecutivoInicial = valueInput
                }
                setMesesC([...MesesC]);
            }
            disabledSaveMeses(false);
        }, 100);
    }

    const changeInputConMesFinal = (element, event)=>{
        disabledSaveMeses(true);
        setTimeout(function(){
            if (event) {
                var valueInput = event.target.value;
                if (valueInput > 2140000000) {
                    event.target.style.background = "var(--colorBase)";
                    event.target.style.color = "white";
                    event.target.value =2140000000; 
                    element.consecutivoFinal = 2140000000;
                    setTimeout(function(){
                        event.target.style.background = "white";
                        event.target.style.color = "black";
                    }, 400);

                }
                else if(valueInput < element.consecutivoInicial){
                    event.target.style.background = "var(--colorBase)";
                    event.target.style.color = "white";
                    event.target.value =element.consecutivoInicial; 
                    element.consecutivoFinal = element.consecutivoInicial;
                    setTimeout(function(){
                        event.target.style.background = "white";
                        event.target.style.color = "black";
                    }, 400);
                }
                else{
                    element.consecutivoFinal = valueInput
                }
                setMesesC([...MesesC]);
            }
            disabledSaveMeses(false);
        }, 1500);
    }

    const disabledSaveMeses = (value) => {
        if (value) {
            document.getElementById('ContainerSaveMeses').classList.add("DisabledContainer");
        }else{
            document.getElementById('ContainerSaveMeses').classList.remove("DisabledContainer");
        }
    }
    const GuardarMesesConsecutivos = async() =>{
        if (MesesC) {
            let MesesSend = [...MesesC];
            MesesSend = MesesSend.map((m) => {
                var newObj = Object.assign({}, m);
                if (!newObj.consecutivoInicial ) {
                    newObj.consecutivoInicial = null;
                }
                if (!newObj.consecutivoFinal ) {
                    newObj.consecutivoFinal = null;
                }
                return newObj;
            });
            let objSend = {
                empId: 1,
                ano:AnoMesesC,
                tpDID: tpDID,
                sucId: cnsSucursal,
                cnsId: cnsId,
                meses: MesesSend
            };
            const response = await Guardar_MesesConsecutivos(objSend);
            if(response?.ok){
                let arraySend = [];
                arraySend = [...arraySend, {
                    "title": "Ejecución exitosa",
                    "desc":  response.descripcion,
                    "type": "alert-success"
                }];
                EventAlerts(arraySend);
                getMesesConsecutivo();
            }else{
                let arraySend = [];
                if (response.datos) {
                    response.datos.map((error) => {
                        const {mesId, mensajeError} = error;
                        let MesesCError = Object.assign(MesesC);
                        MesesCError.map((m) => {
                            if (m.mesId == mesId) {
                                m.error = mensajeError
                            }
                        }); 
                    });
                    
                    arraySend = [...arraySend, {
                        "title": "Error de validación",
                        "desc":  "Hay conflictos con algunos consecutivos, por favor verifique los valores mensuales",
                        "type": "alert-error"
                    }];

                    // ClearTooltips();
                    setTimeout(function(){
                        InstanceTooltips();
                    },1000);
                }else{
                    arraySend = [...arraySend, {
                        "title": "Error de validación",
                        "desc":  response.Descripcion,
                        "type": "alert-error"
                    }];
                }
                EventAlerts(arraySend);
            }
        }
    }

    const InstanceTooltips = ()=> {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        let newArraySet = null;
        let ListTooltipAdd = [...tooltipTriggerList].map(tooltipTriggerEl => {
            var instanced = false;
            for (let i = 0; i < ListTooltip.length; i++) {
                debugger
                if (ListTooltip[i]== tooltipTriggerEl.id) {
                    instanced = true;
                }
            }
            if (instanced == false) {
                new bootstrap.Tooltip(tooltipTriggerEl);
                newArraySet = [...ListTooltip, tooltipTriggerEl.id];
            }
        });
        
        setListTooltip(newArraySet);
    }

    const ClearTooltips = ()=>{
        console.log(ListTooltip);
    }
  return (
    <>
        <div id='CGeneralAdminConsecutivoMensual' className="col-sm-12 h-100">

            <div className='col-sm-12 '>
                <h5 className="titleAdminCM">{sucDesc}</h5>
                <div className='col-sm-12 '>
                    <div className='col-sm-12'>
                        <p className='subtitleAdminCM'>{tpDDesc}</p>
                    </div>
                    <div className='col-sm-12 mt-1 mb-2 d-flex flex-wrap justify-content-center'>
                        
                        <div className='col-sm-12 d-flex justify-content-center'>
                            <div className='col-sm-5'>
                                <Combobox 
                                    ID="ComboAnosMesConsecutivo" 
                                    Data={Anos}
                                    // Name="Años"
                                    params={
                                        {
                                            ID: "ano", 
                                            Text: "ano",
                                            SelectDefault: AnoMesesC ? AnoMesesC : new Date().getFullYear(),
                                            onSelectEvent: ChangeYearConsecutivoMes
                                        }
                                    }
                                />
                            </div>

                            <div id='ContainerSaveMeses' onClick={() => GuardarMesesConsecutivos()} className='col-sm-1 ms-1 d-flex justify-content-center align-items-center CContainerSaveConMes'>
                                <i className="fa-solid fa-floppy-disk IconConMes"></i>
                            </div>
                        </div>
                        
                        <div className='col-sm-12 mt-2 mb-2 d-flex justify-content-center'>
                            <div onClick={() => Autocompletar()} className='col-sm-auto me-3 d-flex justify-content-center align-items-center '>
                                <p className='txtAutoConsecutivos'>Auto</p>
                                {/* <i className="fa-solid fa-caret-left IconConMes"></i> */}
                            </div>

                            <div className='col-sm-auto me-3 d-flex justify-content-center align-items-center '>
                                <p className='txtAutoConsecutivos'> - </p>
                                {/* <i className="fa-solid fa-caret-left IconConMes"></i> */}
                            </div>

                            <div onClick={() => AutocompletarMin()} className='col-sm-auto d-flex justify-content-center align-items-center '>
                                <p className='txtAutoConsecutivos'>Auto corto</p>
                                {/* <i className="fa-solid fa-backward IconConMes"></i> */}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className='col-sm-12'>
                <div className='col-sm-12 d-flex'>
                    <div className='col-sm-4 d-flex justify-content-center'>
                        <p className='txtEncabezadoMeses'>Mes</p>
                    </div>
                    <div className='col-sm-4 d-flex justify-content-center'>
                        <p className='txtEncabezadoMeses'>C.Inicial</p>
                    </div>
                    <div className='col-sm-4 d-flex justify-content-center'>
                        <p className='txtEncabezadoMeses'>C.Final</p>
                    </div>
                </div>
                {
                    MesesC.map((m) => {
                        const {mesId,nombreMes,consecutivoInicial, consecutivoFinal,error} = m;
                        
                        return <div key={mesId} className='col-sm-12 CCardMesConsecutivo'>
                            <div className='col-sm-4 d-flex align-items-center'>
                                <p className='txtxNameMes'>
                                    <b className='FirstLetterMonth'>{nombreMes.charAt(0)}</b>
                                    {nombreMes.substring(1)}
                                    {error && <i data-bs-toggle="tooltip" data-bs-html="true" title={error} className="ms-2 IconAdvertencia fa-solid fa-circle-exclamation" id={"Tool"+mesId+AnoMesesC}></i>} 
                                </p>
                            </div>
                            <div className='col-sm-4'>
                                <input onKeyDown={(e) => changeInputConMesIni(m,e)} type="number" className='inputConsecutivoMes' defaultValue={consecutivoInicial}/>
                            </div>
                            <div className='col-sm-4'>
                                <input onChange={(e) => changeInputConMesFinal(m,e)} type="number" className='inputConsecutivoMes' defaultValue={consecutivoFinal}/>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </>
  )
}
