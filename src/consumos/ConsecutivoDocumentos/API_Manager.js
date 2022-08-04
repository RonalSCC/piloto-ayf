import Config from '../../config/config';
export const SendRequest = async(obj, ruta) => {
    try {
        const paramsConfig = {
            body:JSON.stringify(obj),
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            };
        const resp   = await fetch(`${Config.URLServiceContabilidad + ruta}`, paramsConfig);
        const data = await resp.json(); 
        return data;
    } catch (error) {
        // manejo del error
        console.log(error)
        return {};
    }
}

export const SendRequest_Maestros = async(obj, ruta) => {
    try {
        const paramsConfig = {
            body:JSON.stringify(obj),
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            };
        const resp   = await fetch(`${Config.URLServiceMaestros + ruta}`, paramsConfig);
        const data = await resp.json(); 
        return data;
    } catch (error) {
        // manejo del error
        console.log(error)
        return {};
    }
}


