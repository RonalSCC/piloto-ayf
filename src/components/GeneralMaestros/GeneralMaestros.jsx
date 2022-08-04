import { useEffect, useState } from 'react';
import { SendRequest_Maestros } from '../../consumos/ConsecutivoDocumentos/API_Manager';
import '../../styles/components/GeneralMaestros/GeneralMaestros.css'
import Alert from '../Alert';
import Loader from '../Comunes/Loader';
import HeaderMaestros from '../Maestros/HeaderMaestros'
export default function GeneralMaestros() {

    const [ListMaestrosBase, setListMaestrosBase] = useState([]);
    const [ListMaestros, setListMaestros] = useState([]);
    const [ListAlert, setListAlert] = useState([]);

    const getMaestros = async() => {
        const response = await SendRequest_Maestros({},"GeneralMaestros/Consultar_MaestrosGenerales");
        if(response?.ok){
            setListMaestros(response.datos);
            setListMaestrosBase(response.datos);
        }else{
            if(response.errores){
                let arraySend = [];
                response.errores.map((error) => {
                    const {codigo, descripcion} = error;
                    arraySend = [...arraySend, {
                        "title": `Error de validación (${codigo})`,
                        "desc": `${descripcion}`,
                        "type": "alert-error"
                    }];
                });
                ShowAlerts(arraySend);
            }
        }
    }

    const ShowAlerts = (array)=> {
        setListAlert(array);
    }

    const SearchMaestro = (event)=>{
        // setListMaestros([]);
        if (event) {
            var value = event.target.value;
            if (value) {
                setTimeout(function(){

                    let dataFilter = [];
                    ListMaestrosBase.map((m) => {
                        let newObj = {...m};
                        let maeIncludes = [];
                        m.listMaestros.map((mae) => {
                            if (mae.gmTitulo.toLowerCase().includes(value.toLowerCase())) {
                                maeIncludes = [...maeIncludes, mae];
                            }
                        })
                        if (maeIncludes.length > 0) {
                            newObj.listMaestros = maeIncludes;
                            dataFilter = [...dataFilter, newObj];
                        }
                    });
                    setListMaestros(dataFilter);
                },100);
            }else{
                setListMaestros(ListMaestrosBase);
            }
        }
    }

    const SelectCategoria = (id) => {
        if (id) {
            document.getElementById('InputSearchMaestros').value = '';
            let maestrosFilterCategory = [];
            ListMaestrosBase.map((m)=> {
                if (m.cmId == id) {
                    maestrosFilterCategory = [...maestrosFilterCategory, m];
                }
            });
            setListMaestros(maestrosFilterCategory);
        }else{
            setListMaestros(ListMaestrosBase);
        }
    }

    const RedirectOption = (maestro) => {
        if (maestro && maestro.gmRuta) {
            window.location.href = window.location.origin + maestro.gmRuta;
        }
    }
    useEffect(() => {
        getMaestros();
    }, []);
  return (
    <>
        <div className="col-sm-12 h-100 ContenedorGeneralMaestros">
            {/* <HeaderMaestros
                txtTitle="Maestros"
                txtSubtitle="AYF"
            /> */}

            <div className='col-sm-12 d-flex h-100'>
                <div className='col-sm-2 ContainerCategorias d-flex flex-wrap'>
                    <div className='col-sm-12 CCategoriaMaestros'>
                        <div className='col-sm-12 mb-3 mt-2'>
                            <h5 className='text-center TitleCategorySection'>Maestros</h5>
                        </div>

                        <div className='col-sm-12'>
                            <ul className='UlListCategory'>
                                <li onClick={() => SelectCategoria()}><p className='txtOptionCategory'>
                                    <i className="fa-solid fa-list me-2"></i>
                                    Todos
                                </p></li>
                                {
                                   ListMaestrosBase.map((obj) => {
                                    const {cmNombre,cmId,cmIcon,listMaestros} = obj;
                                    return  <li onClick={() => SelectCategoria(cmId)} key={cmId}><p className='txtOptionCategory'>
                                                <i className={cmIcon + " me-2"}></i>
                                                {cmNombre}
                                            </p></li>
                                    
                                   }) 
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='col-sm-12 CLogoAYFFooterMaestros'>
                        <img src={'LogoAYF.png'} className="img-fluid" alt="" />
                    </div>
                </div>
                <div className='col-sm-10 ContainerMaestrosCard d-flex justify-content-end flex-wrap'>
                    <div className='ContainerCardCategorias mt-3'>
                        <div className='col-sm-12'>
                            <input id='InputSearchMaestros' onKeyUp={SearchMaestro} className='inputSearch' type="text" placeholder='Buscar...' />
                        </div>
                        {
                            ListMaestros.map((obj) => {
                                const {cmNombre,cmId,cmIcon,listMaestros} = obj;
                                return <div key={cmId} className='col-sm-12'>
                                        <div className='col-sm-12'>
                                            <h5 className='TitleSectionCards'>{cmNombre}</h5>
                                        </div>
                                        {/* <hr /> */}
                                        <div className='col-sm-12 d-flex flex-wrap'>
                                            {/* Card ------ Maestro */}
                                            {
                                                listMaestros.map((mae, index) => {
                                                    const {gmDescripcion,gmIcon,gmId,gmRuta,gmTitulo} =mae; 
                                                    return <div key={gmId} onClick={()=> RedirectOption(mae)} className='col-sm-4 ContainerCard'>
                                                                <div className={"col-sm-12 CardMaestro "}>
                                                                    <div className='col-sm-2 d-flex justify-content-center'>
                                                                        <i className={gmIcon + " IconCard"}></i>
                                                                    </div>
                                                                    <div className='col-sm-9 h-100'>
                                                                        <div className='col-sm-12 CTitleCard'>
                                                                            <h5 className='TitleCard'>{gmTitulo}</h5>
                                                                        </div>
                                                                        <div className='col-sm-12 CTextCard scrollAYF'>
                                                                            <p className='DescCard'>{gmDescripcion}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-sm-12 FooterCard'>
                                                                    <p className='CategoriaMaestro'>{cmNombre}</p>
                                                                </div>
                                                            </div>
                                                })
                                                
                                            }
                                        </div>
                                    </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        <Alert ListData={ListAlert} ChangeAlerts={ShowAlerts}/>
        {/* <Loader></Loader> */}
    </>

  )
}
