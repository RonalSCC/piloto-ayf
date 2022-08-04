import Config from '../config/config';
export const Eliminar_PeriodoContable = async(obj) => {
    try {
        const paramsConfig = {
            body: JSON.stringify(obj), 
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            };
        const resp   = await fetch(`${Config.URLServiceContabilidad}PeriodosContables/Eliminar_PeriodoContable`, paramsConfig);
        const data = await resp.json(); 
        return data;
    } catch (error) {
        // manejo del error
        console.log(error)
        return 'No se encontró información';
    }
}



