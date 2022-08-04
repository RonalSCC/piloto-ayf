import { useEffect, useState } from 'react';
import '../../styles/DataGrid.css';
import '../../styles/components/ConsecutivoDocumentos/DatagridTD.css';

import moment from 'moment';
import { SendRequest } from '../../consumos/ConsecutivoDocumentos/API_Manager';
import Combobox from '../Combobox';
import { Consultar_TipoDocumentos } from '../../consumos/ConsecutivoDocumentos/Consultar_TipoDocs';
export default function DataGrid_TDConsecutivo({Datos, AdminMenEvent,EventAlerts, ReloadDataGRID, SucId, EventEditConsecutivo}) {

    const [TipoDocsNew, setTipoDocsNew] = useState([]);
    const [TipoDocSelecNew, setTipoDocSelecNew] = useState(null);
    const [ConsecutivoInicialNew, setConsecutivoInicialNew] = useState(null);
    const [ConsecutivoFinalNew, setConsecutivoFinalNew] = useState(null);
    const [ModalEdicion, setModalEdicion] = useState(null);

    const changeConsecutivoIni = (event, element) =>{
        element.cnsIni = event.target.value;
    }

    const changeConsecutivoFin = (event, element) =>{
        element.cnsFin = event.target.value;
    }

    const AdministrarConsecutivoMensual = (selected) =>{
        AdminMenEvent(selected);
    }

    const InValidELetter = (event)=> {
        if (event.keyCode == 69) {
            return event.preventDefault();
        }
        // return event.keyCode === 69 || event.charCode >= 48 && event.charCode <= 57
    }

    

    const getTipoDocumentos = async() => {
        var IdsExclude = Datos.map((td) => {
            return td.tpDID
        });
        const responseTD = await SendRequest({
            idsExclude: IdsExclude
        }, "Consultas/Consultar_TipoDocumentos");
        if(responseTD?.ok){
            setTipoDocsNew(responseTD.datos);
        }else{
            if(responseTD.errores){
                let arraySend = [];
                responseTD.errores.map((error) => {
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

    const ValidConsecutivos = (consecutivoInicial, consecutivoFinal) => {
        let ListAlert = [];
        if (parseInt(consecutivoInicial)<= 0 || !consecutivoInicial) {
            ListAlert = [...ListAlert, {
                "title": `Error de validación`,
                "desc": `Debe ingresar un consecutivo inicial`,
                "type": "alert-warning"
            }];
        }
  
        if (parseInt(consecutivoFinal) <= 0 || !consecutivoFinal) {
            ListAlert = [...ListAlert, {
                "title": `Error de validación`,
                "desc": `Debe ingresar un consecutivo final`,
                "type": "alert-warning"
            }];
        }
  
        if (parseInt(consecutivoFinal) < parseInt(consecutivoInicial)) {
            ListAlert = [...ListAlert, {
                "title": `Error de validación`,
                "desc": `El consecutivo final no puede ser menor al inicial`,
                "type": "alert-warning"
            }];
        }
  
        if (parseInt(consecutivoInicial) > 2140000000) {
            ListAlert = [...ListAlert, {
                "title": `Error de validación`,
                "desc": `El consecutivo inicial no puede ser mayor a 2140000000`,
                "type": "alert-warning"
            }];
        }
  
        if (parseInt(consecutivoFinal) > 2140000000) {
            ListAlert = [...ListAlert, {
                "title": `Error de validación`,
                "desc": `El consecutivo final no puede ser mayor a 2140000000`,
                "type": "alert-warning"
            }];
        }
  
        return ListAlert;
    }

    const SelectTipoDocNew = (obj) =>{
        setTipoDocSelecNew(obj);
    }

    const GuardarNuevoConsecutivo = async()  =>{
        let ListAlert = [];
        if (TipoDocSelecNew) {
            if (TipoDocSelecNew.tpDConsMes == 0) {
                ListAlert = ValidConsecutivos(ConsecutivoInicialNew, ConsecutivoFinalNew);
                if (ListAlert != null && ListAlert.length > 0) {
                    EventAlerts(ListAlert);
                    return;
                }
            }

            const response = await SendRequest({
                empId: 1,
                tpDID: TipoDocSelecNew.tpDID,
                sucId: SucId,
                ConsecutivoInicial: ConsecutivoInicialNew,
                ConsecutivoFinal: ConsecutivoFinalNew
            }, "ConsecutivoDocumentos/Guardar_Consecutivos");
            if(response?.ok){
                ReloadDataGRID();
                ListAlert = [{
                    "title": "Inserción exitosa",
                    "desc":  response.descripcion,
                    "type": "alert-success"
                }];

            }else{
                if (response.datos) {
                    response.datos.map((error) => {
                        const { mensajeError, cnsId} = error;
                        ListAlert = [...ListAlert, {
                            "title": "Error de validación",
                            "desc":  mensajeError,
                            "type": "alert-warning"
                        }];
                    });
                }else{
                    ListAlert = [...ListAlert, {
                        "title": "Error de validación",
                        "desc":  response.Descripcion,
                        "type": "alert-warning"
                    }];
                }
                if(response.errores){
                    response.errores.map((error) => {
                        const {codigo, descripcion} = error;
                        ListAlert = [...ListAlert, {
                            "title": `Error de validación (${codigo})`,
                            "desc": `${descripcion}`,
                            "type": "alert-warning"
                        }];
                    });
                }
            }
            EventAlerts(ListAlert);
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

    const EliminarConsecutivo = async(data) => {
        if (data) {
            let ListAlert = [];
            const response = await SendRequest({
                empId: 1,
                CnsId: data.cnsId,
            }, "ConsecutivoDocumentos/Eliminar_Consecutivo");
            if(response?.ok){
                ReloadDataGRID();
                ListAlert = [{
                    "title": "Eliminación exitosa",
                    "desc":  response.descripcion,
                    "type": "alert-info"
                }];
    
            }else{
                if(response.errores){
                    response.errores.map((error) => {
                        const {codigo, descripcion} = error;
                        ListAlert = [...ListAlert, {
                            "title": `Error de validación (${codigo})`,
                            "desc": `${descripcion}`,
                            "type": "alert-warning"
                        }];
                    });
                }
            }

            if (ListAlert.length >0) {
                EventAlerts(ListAlert);
            }
        }
    }

    useEffect(() => {
        getTipoDocumentos();
    }, [Datos])
    
  return (
    <>
        <table className="table tableAyF table-bordered table-hover ">
            <thead className="thead-ayf">
                <tr>
                    <th><i className="fa-solid fa-bell"></i></th>
                    <th scope="col">Tipo Documento</th>
                    <th scope="col">Consecutivo inicial</th>
                    <th scope="col">Consecutivo final</th>
                    <th scope="col">Consecutivo mensual</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr className='mb-2'>
                    <td className='TDNewConsecutivo'>
                        {/* <i className="fa-solid fa-circle-plus IconSave" style={{color: 'white'}}></i> */}
                    </td>
                    <td className='TDNewConsecutivo'>
                        <Combobox 
                            ID="ComboTipoDocNew" 
                            Data={TipoDocsNew}
                            params={
                                {
                                    ID: "tpDID", 
                                    Text: "concatName",
                                    onSelectEvent: SelectTipoDocNew
                                }
                            }
                        />
                    </td>
                    <td className='TDNewConsecutivo'>
                        <input 
                            className='inputConsecutivoNew' 
                            type="number" 
                            onKeyUp={SetValueConsIniNew}
                            disabled={TipoDocSelecNew?.tpDConsMes == 1 ? true:false}
                            defaultValue={ConsecutivoInicialNew}
                        />
                    </td>
                    <td className='TDNewConsecutivo'>
                        <input 
                            className='inputConsecutivoNew' 
                            type="number" 
                            onKeyUp={SetValueConsFinNew}
                            disabled={TipoDocSelecNew?.tpDConsMes == 1 ? true:false}
                            defaultValue={ConsecutivoFinalNew}
                        />
                    </td>
                    <td></td>
                    <td className='TDNewConsecutivo'>
                        <i onClick={() => GuardarNuevoConsecutivo()} className="fa-solid fa-circle-plus IconAdd" style={{cursor:'pointer'}} data-bs-toggle="tooltip" data-bs-html="true" title={"Agregar"}></i>
                        {/* <i className="fa-solid fa-floppy-disk IconSave me-4" style={{cursor:'pointer'}}></i> */}
                    </td>
                </tr>
                {
                    Datos.map((obj) => {
                        const {tpDID, tpDDesc, cnsIni, cnsFin, cnsId, tpDConsMes, advertencia} = obj;
                        
                        return<tr key={tpDID}>
                                <td className='text-center' data-bs-toggle="tooltip" data-bs-html="true" title={advertencia && "<b>Meses sin configurar</b>: "+ advertencia}> 
                                    {advertencia && <i className="IconAdvertencia fa-solid fa-circle-exclamation"></i>} 
                                </td>
                                <td style={{width:"30%"}}>{tpDDesc}</td>
                                <td style={{width:"18%"}} className="ps-2 tdConsecutivo" >
                                    {/* {
                                       
                                        <input 
                                            className={"inputConsecutivo "+(tpDConsMes == 0 && "InputActiveDGConsecutivo")}
                                            type="number" 
                                            onChange={(event) => changeConsecutivoIni(event,obj)}
                                            defaultValue={cnsIni && cnsIni}
                                            disabled={tpDConsMes == 1 ? true:false}
                                            onKeyDown={InValidELetter}
                                        />
                                    } */}
                                    {cnsIni}
                                </td>
                                <td style={{width:"18%"}} className=" tdConsecutivo">
                                    {/* {
                                        <input 
                                            className={"inputConsecutivo "+(tpDConsMes == 0 && "InputActiveDGConsecutivo")}
                                            type="number" 
                                            onChange={(event) => changeConsecutivoFin(event,obj)}
                                            defaultValue={cnsFin && cnsFin}
                                            disabled={tpDConsMes == 1 ? true:false}
                                            onKeyDown={InValidELetter}
                                        />
                                    } */}
                                     {cnsFin}
                                </td>
                                <td style={{width:"22%"}} onClick={tpDConsMes == 1 ? () => AdministrarConsecutivoMensual(obj): undefined} className="text-center AdminMesesTD">{tpDConsMes == 1 ? "Administrar": ""}</td>
                                <td className='tdEliminar'>
                                    {
                                        tpDConsMes == 0 ? <i onClick={() => EventEditConsecutivo(obj)} className={"fa-solid fa-pencil IconSave me-2"} data-bs-toggle="tooltip" data-bs-html="true" title={"Editar"}></i> : <i className='me-4'></i>
                                    } 
                                    <i onClick={() => EliminarConsecutivo(obj)} className="fa-solid fa-trash-can IconTrash" data-bs-toggle="tooltip" data-bs-html="true" title={"Eliminar"}></i>
                                </td>
                            </tr>
                    })
                }
            </tbody>
        </table>
    </>
  )
}
