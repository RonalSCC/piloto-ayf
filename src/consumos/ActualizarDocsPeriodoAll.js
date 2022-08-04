import Config from '../config/config';
export const ActualizarDocPeriodoAll = async({PerId,Accion, Confirm}) => {
    try {
        const paramsConfig = {
            body: JSON.stringify({
                PerId: PerId,
                Accion: Accion,
                Confirm: Confirm
            }),
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            };
        const resp   = await fetch(`${Config.URLServiceContabilidad}PeriodosContables/Actualizar_PeriodoContDocAll`, paramsConfig);
        const data = await resp.json(); 
        return data;
    } catch (error) {
        // manejo del error
        console.log(error)
        return 'No se encontró información';
    }
}



