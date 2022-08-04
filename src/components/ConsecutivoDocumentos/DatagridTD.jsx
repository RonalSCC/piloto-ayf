import { useEffect, useState } from 'react';
import '../../styles/DataGrid.css';
import '../../styles/components/ConsecutivoDocumentos/DatagridTD.css';

import moment from 'moment';
import { SendRequest } from '../../consumos/ConsecutivoDocumentos/API_Manager';
import Combobox from '../Combobox';
import { Consultar_TipoDocumentos } from '../../consumos/ConsecutivoDocumentos/Consultar_TipoDocs';
export default function DataGrid_TDConsecutivo({Datos, AdminMenEvent,EventAlerts, ReloadDataGRID, SucId, EventEditConsecutivo}) {

    const AdministrarConsecutivoMensual = (selected) =>{
        AdminMenEvent(selected);
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
                {
                    Datos.map((obj) => {
                        const {tpDID, tpDDesc, cnsIni, cnsFin, cnsId, tpDConsMes, advertencia} = obj;
                        
                        return<tr key={tpDID}>
                                <td className='text-center' data-bs-toggle="tooltip" data-bs-html="true" title={advertencia && "<b>Meses sin configurar</b>: "+ advertencia}> 
                                    {advertencia && <i className="IconAdvertencia fa-solid fa-circle-exclamation"></i>} 
                                </td>
                                <td style={{width:"30%"}}>{tpDDesc}</td>
                                <td style={{width:"18%"}} className="ps-2 tdConsecutivo" >
                                    {cnsIni}
                                </td>
                                <td style={{width:"18%"}} className=" tdConsecutivo">
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
