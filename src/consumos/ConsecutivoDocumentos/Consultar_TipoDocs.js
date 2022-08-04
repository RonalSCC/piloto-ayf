import Config from '../../config/config';
export const Consultar_TipoDocumentos = async() => {
    try {
        const paramsConfig = {
            body: JSON.stringify({}),
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            };
        const resp   = await fetch(`${Config.URLServiceContabilidad}Consultas/Consultar_TipoDocumentos`, paramsConfig);
        const data = await resp.json(); 
        return data;
    } catch (error) {
        // manejo del error
        console.log(error)
        return {};
    }
}



