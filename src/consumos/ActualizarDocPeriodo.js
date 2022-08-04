import Config from '../config/config';
export const ActualizarDocPeriodo = async({empId,PerId, TPDID, Accion}) => {
    try {
        const paramsConfig = {
            body: JSON.stringify({
                empId: empId,
                PerId: PerId,
                TPDID: TPDID,
                Accion: Accion
            }),
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            };
        const resp   = await fetch(`${Config.URLServiceContabilidad}PeriodosContables/Actualizar_PeriodoContDoc`, paramsConfig);
        const data = await resp.json(); 
        return data;
    } catch (error) {
        // manejo del error
        console.log(error)
        return 'No se encontró información';
    }
}



