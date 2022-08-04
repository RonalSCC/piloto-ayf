import Config from '../../config/config';
export const Consultar_ConsecutivoMesAno = async(obj) => {
    try {
        const paramsConfig = {
            body:JSON.stringify(obj),
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            };
        const resp   = await fetch(`${Config.URLServiceContabilidad}ConsecutivoDocumentos/Consultar_ConsecutivoMesAno`, paramsConfig);
        const data = await resp.json(); 
        return data;
    } catch (error) {
        // manejo del error
        console.log(error)
        return {};
    }
}



