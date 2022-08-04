import Config from '../config/config';
export const Actualizar_PeriodoContable = async(periodoContable) => {
    try {
        const paramsConfig = {
            body: JSON.stringify(periodoContable),
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            };
        const resp   = await fetch(`${Config.URLServiceContabilidad}PeriodosContables/Actualizar_PeriodoContable`, paramsConfig);
        const data = await resp.json(); 
        return data;
    } catch (error) {
        // manejo del error
        console.log(error)
        return 'No se encontró información';
    }
}



