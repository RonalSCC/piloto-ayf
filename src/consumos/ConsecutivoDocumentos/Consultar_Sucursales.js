import Config from '../../config/config';
export const Consultar_Sucursales = async(EmpresaID) => {
    try {
        const paramsConfig = {
            body:JSON.stringify({
                sucEmpresa: EmpresaID
            }),
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            };
        const resp   = await fetch(`${Config.URLServiceContabilidad}ConsecutivoDocumentos/Consultar_SucursalesConsec`, paramsConfig);
        const data = await resp.json(); 
        return data;
    } catch (error) {
        // manejo del error
        console.log(error)
        return {};
    }
}



