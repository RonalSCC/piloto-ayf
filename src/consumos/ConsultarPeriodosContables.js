import Config from '../config/config';
export const getPeriodosContables = async(Ano) => {
    try {
        const paramsConfig = {
            method: 'GET', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            };
        let queryString = ``;
        if (Ano) {
            queryString += `?Ano=${Ano}`;
        }
        const resp   = await fetch(`${Config.URLServiceContabilidad}PeriodosContables/GetListPeriodosContables${queryString}`, paramsConfig);
        const data = await resp.json(); 
        return data;
    } catch (error) {
        // manejo del error
        console.log(error)
        return [];
    }
}



