import Config from '../config/config';
export const getLogsPeriodosContables = async() => {
    try {
        const paramsConfig = {
            method: 'GET', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            };
        const resp   = await fetch(`${Config.URLServiceContabilidad}PeriodosContables/GetLogs`, paramsConfig);
        const data = await resp.json(); 
        return data;
    } catch (error) {
        // manejo del error
        console.log(error)
        return [];
    }
}

