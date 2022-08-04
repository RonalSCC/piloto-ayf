import moment from 'moment';
import '../styles/components/ModalLogs.css';
export default function DataGridLogs({Datos}) {
  return (
    <>
        <table className="table tableAyF table-bordered table-hover tableLogs">
            <thead className="thead-ayf">
                <tr>
                    <th scope="col">Periodo</th>
                    <th scope="col">Tipo Cambio</th>
                    <th scope="col">Fecha Cambio</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Periodo</th>
                    <th scope="col">Cartera</th>
                    <th scope="col">Contabilidad</th>
                    <th scope="col">Tesorería</th>
                    <th scope="col">Seguridad social</th>
                    <th scope="col">Liquidaciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    Datos.map(({logId,logTipo,logFecha,logUsu,logPerId,logPerFI,logPerFF,logPerPAAG,logPerEstado,logPerEstadoContab,logPerContabilidad,logPerTesoreria,logPerSS,logPerCartera,logPerEmpresa,logPerLiquidacion, usuario}) => 
                        <tr key={logId}>
                            <td className='tdLogsPeriodos'>{moment(logPerFI).format("DD/MM/yyyy") + " - " + moment(logPerFF).format("DD/MM/yyyy")}</td>
                            <td className='tdLogsPeriodos text-center'>
                            {
                                logTipo == "M" ? <i className="IconTipoCambio IconEditLog   fa-solid fa-pen"></i>:
                                logTipo == "E" ? <i className="IconTipoCambio IconDeleteLog fa-solid fa-trash"></i> :
                                logTipo == "I" ? <i className="IconTipoCambio IconAddLog   fa-solid fa-circle-plus"></i> : ""
                            }
                            </td>
                            <td className='tdLogsPeriodos'>{moment(logPerFI).format("DD/MM/yyyy hh:mm:ss")}</td>
                            <td className='tdLogsPeriodos'>{usuario}</td>
                            <td className='text-center'>{logPerEstadoContab == 'C' ? <i className="fa-solid fa-lock iconLock"></i> : <i className="fa-solid fa-lock-open iconUnlock"></i>}</td>
                            <td className='text-center'>{logPerCartera == 'C' ? <i className="fa-solid fa-lock iconLock"></i> : <i className="fa-solid fa-lock-open iconUnlock"></i>}</td>
                            <td className='text-center'>{logPerContabilidad == 'C' ? <i className="fa-solid fa-lock iconLock"></i> : <i className="fa-solid fa-lock-open iconUnlock"></i>}</td>
                            <td className='text-center'>{logPerTesoreria == 'C' ? <i className="fa-solid fa-lock iconLock"></i> : <i className="fa-solid fa-lock-open iconUnlock"></i>}</td>
                            <td className='text-center'>{logPerSS == 'C' ? <i className="fa-solid fa-lock iconLock"></i> : <i className="fa-solid fa-lock-open iconUnlock"></i>}</td>
                            <td className='text-center'>{logPerLiquidacion == 'C' ? <i className="fa-solid fa-lock iconLock"></i> : <i className="fa-solid fa-lock-open iconUnlock"></i>}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </>
  )
}
