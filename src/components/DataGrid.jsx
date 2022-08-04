import { useEffect, useState } from 'react';
import '../styles/DataGrid.css';
import moment from 'moment';
import $ from "jquery";
export default function DataGrid({Datos, EventChange, ChangeEstado, EventEliminarPeriodo}) {

    
  return (
    <>
        <table className="table tableAyF table-bordered table-hover ">
            <thead className="thead-ayf">
                <tr>
                    <th scope="col">Fecha inicial</th>
                    <th scope="col">Fecha final</th>
                    <th scope="col">Periodo</th>
                    <th scope="col">Cartera</th>
                    <th scope="col">Contabilidad</th>
                    <th scope="col">Tesorería</th>
                    <th scope="col">Seguridad Social</th>
                    <th scope="col">Liquidaciones</th>
                    <th scope="col">Tipo de documento</th>
                    <th scope="col">Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {
                    Datos.map((objPeriodo) => {
                        const {perId, perFI, perFF, perPAAG, perEstado, perEstadoContab, perContabilidad, perTesoreria, perSS, perCartera, perLiquidacion} = objPeriodo;
                        return  <tr key={perId}>
                                    <td className='tdPeriodoContable'>{moment(perFI).format("DD/MM/yyyy")}</td>
                                    <td className='tdPeriodoContable'>{moment(perFF).format("DD/MM/yyyy")}</td>
                                    <td className='tdPeriodoContable'>{
                                        perEstadoContab == 'C' ? 
                                        <i onClick={() => ChangeEstado(objPeriodo, "perEstadoContab")} className="fa-solid fa-lock iconLock"></i> : 
                                        <i onClick={() => ChangeEstado(objPeriodo, "perEstadoContab")} className="fa-solid fa-lock-open iconUnlock"></i>
                                    }</td>
                                    <td className='tdPeriodoContable'>{
                                        perCartera == 'C' ? 
                                        <i onClick={() => ChangeEstado(objPeriodo, "perCartera")} className="fa-solid fa-lock iconLock"></i> : 
                                        <i onClick={() => ChangeEstado(objPeriodo, "perCartera")} className="fa-solid fa-lock-open iconUnlock"></i>
                                    }</td>
                                    <td className='tdPeriodoContable'>{
                                        perContabilidad == 'C' ? 
                                        <i onClick={() => ChangeEstado(objPeriodo, "perContabilidad")} className="fa-solid fa-lock iconLock"></i> : 
                                        <i onClick={() => ChangeEstado(objPeriodo, "perContabilidad")} className="fa-solid fa-lock-open iconUnlock"></i>
                                    }</td>
                                    <td className='tdPeriodoContable'>{
                                        perTesoreria == 'C' ? 
                                        <i onClick={() => ChangeEstado(objPeriodo, "perTesoreria")} className="fa-solid fa-lock iconLock"></i> : 
                                        <i onClick={() => ChangeEstado(objPeriodo, "perTesoreria")} className="fa-solid fa-lock-open iconUnlock"></i>
                                    }</td>
                                    <td className='tdPeriodoContable'>{
                                        perSS == 'C' ? 
                                        <i onClick={() => ChangeEstado(objPeriodo, "perSS")} className="fa-solid fa-lock iconLock"></i> : 
                                        <i onClick={() => ChangeEstado(objPeriodo, "perSS")} className="fa-solid fa-lock-open iconUnlock"></i>
                                    }</td>
                                    <td className='tdPeriodoContable'>{
                                        perLiquidacion == 'C' ? 
                                        <i onClick={() => ChangeEstado(objPeriodo, "perLiquidacion")} className="fa-solid fa-lock iconLock"></i> : 
                                        <i onClick={() => ChangeEstado(objPeriodo, "perLiquidacion")} className="fa-solid fa-lock-open iconUnlock"></i>
                                    }</td>
                                    <td className='text-center tdAdmin' onClick={() => EventChange({perId:perId, FInicial:perFI, FFinal: perFF})}>Administrar</td>
                                    <td onClick={() => EventEliminarPeriodo(objPeriodo)} className='tdEliminar'><i className="fa-solid fa-trash-can IconTrash"></i></td>
                                </tr>
                    })
                }
            </tbody>
        </table>
    </>
  )
}
