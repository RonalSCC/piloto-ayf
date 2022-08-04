import Config from '../../config/config.js';
import HeaderMaestros from "../Maestros/HeaderMaestros"
import Combobox from "../Combobox";
import { Consultar_Sucursales } from "../../consumos/ConsecutivoDocumentos/Consultar_Sucursales";
import { useEffect, useState } from "react";
import { Consultar_TipoDocumentos } from "../../consumos/ConsecutivoDocumentos/Consultar_TipoDocs";
import { Consultar_ConsecutivosTD } from "../../consumos/ConsecutivoDocumentos/Consultar_ConsecutivosTD";
import  AdminConsecutivoMensual  from "./AdminConsecutivoMensual";
import Alert from "../Alert";
import DataGrid_TDConsecutivo from "./DatagridTD";
import '../../styles/components/Maestros/SectionAditional.css';
import '../../styles/components/ConsecutivoDocumentos/ConsecutivoDocumentos.css';

import '../../helpers/StickyScroll'
import $ from "jquery";
import * as bootstrap from 'bootstrap'
import { SendRequest } from '../../consumos/ConsecutivoDocumentos/API_Manager.js';
import ModalEditarConsecutivo from './ModalEditarConsecutivo.jsx';

export default function ConsecutivoDocumentos({ChangeAlerts}) {

    const [Sucursales, setSucursales] = useState([]);
    const [TipoDocumentos, setTipoDocumentos] = useState([]);
    const [ListAlert, setListAlert] = useState([]);
    const [ConsecutivosTD, setConsecutivosTD] = useState([]);
    const [SucursalSelected, setSucursalSelected] = useState(null);
    const [TipoDocSelected, setTipoDocSelected] = useState(null);
    const [ConsecutivoSelected, setConsecutivoSelected] = useState(null)
    const [ShowSection, setShowSection] = useState(false);
    const [ConsecutivoEdit, setConsecutivoEdit] = useState({});
    const [ModalEdicion, setModalEdicion] = useState(null);
    let SucID = null;
    const getSucursales = async() => {
        const responseSucursales = await Consultar_Sucursales(1);
        if(responseSucursales?.ok){
          setSucursales(responseSucursales.datos);
        }else{
            if(responseSucursales.errores){
                let arraySend = [];
                responseSucursales.errores.map((error) => {
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

    const getTipoDocumentos = async() => {
      const responseTD = await Consultar_TipoDocumentos();
      if(responseTD?.ok){
        setTipoDocumentos(responseTD.datos);
      }else{
          if(responseTD.errores){
              let arraySend = [];
              responseTD.errores.map((error) => {
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

    useEffect(() => {
        getSucursales();
        getTipoDocumentos();
        $('body').on('blur', 'input[type=number]', function (e) {
          $(this).off('wheel.disableScroll')
        })
    }, []);
    
    const SelectSucursal = (select) =>{
      if (select) {
        setSucursalSelected(select.sucID);
        get_ConsecutivosTD({
          SucEmpresa: 1,
          SucId: select.sucID,
          tpDID:TipoDocSelected
        });
      }
    }

    const SelectTipoDocumento = (select) =>{
      if (select && SucursalSelected) {
        setTipoDocSelected(select.tpDID);
        get_ConsecutivosTD({
          SucEmpresa: 1,
          SucId: SucursalSelected,
          tpDID: select.tpDID
        });
      }
    }

    const ClearTipoDocumento= () =>{
      setTipoDocSelected(null);

      get_ConsecutivosTD({
        SucEmpresa: 1,
        SucId: SucursalSelected
      });
    }

    const ClearSucursal= () =>{
      setSucursalSelected(null);
      setConsecutivosTD([]);
    }

    const get_ConsecutivosTD = async({SucEmpresa, SucId, tpDID}) => {
        setConsecutivosTD([]);
        const response = await Consultar_ConsecutivosTD({
          SucEmpresa: SucEmpresa,
          SucId: SucId,
          tpDID: tpDID
        });
        if(response?.ok){
          setConsecutivosTD(response.datos);
          $(function() {
              setTimeout(function(){
                  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
                  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
              },500);
          });
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

    const ShowHideSection = (state = null)=>{
      if (state) {
        setShowSection(state);
      }else{
        setShowSection(!ShowSection);
      }
    }

    const AdministrarConsecutivoMen = (selected)=>{
        if (selected) {
            ShowHideSection(true);
            setConsecutivoSelected(selected); 
        }
    }

    const ReloadDataGRID = ()=>{
      get_ConsecutivosTD({
        SucEmpresa: 1,
        SucId: SucursalSelected,
        tpDID:TipoDocSelected
      });
    }

    const ValidConsecutivos = (consecutivoInicial, consecutivoFinal) => {
      let ListAlert = [];
      if (parseInt(consecutivoInicial)<= 0 || !consecutivoInicial) {
          ListAlert = [...ListAlert, {
              "title": `Error de validación`,
              "desc": `Debe ingresar un consecutivo inicial`,
              "type": "alert-warning"
          }];
      }

      if (parseInt(consecutivoFinal) <= 0 || !consecutivoFinal) {
          ListAlert = [...ListAlert, {
              "title": `Error de validación`,
              "desc": `Debe ingresar un consecutivo final`,
              "type": "alert-warning"
          }];
      }

      if (parseInt(consecutivoFinal) < parseInt(consecutivoInicial)) {
          ListAlert = [...ListAlert, {
              "title": `Error de validación`,
              "desc": `El consecutivo final no puede ser menor al inicial`,
              "type": "alert-warning"
          }];
      }

      if (parseInt(consecutivoInicial) > 2140000000) {
          ListAlert = [...ListAlert, {
              "title": `Error de validación`,
              "desc": `El consecutivo inicial no puede ser mayor a 2140000000`,
              "type": "alert-warning"
          }];
      }

      if (parseInt(consecutivoFinal) > 2140000000) {
          ListAlert = [...ListAlert, {
              "title": `Error de validación`,
              "desc": `El consecutivo final no puede ser mayor a 2140000000`,
              "type": "alert-warning"
          }];
      }

      return ListAlert;
  }

    const EditarConsecutivo = (obj)=>{
      if (obj) {
        if (ModalEdicion== null) {
            let ModalEdit = new bootstrap.Modal(document.getElementById('ModalEditarConsecutivo'));
            setModalEdicion(ModalEdit);
            ModalEdit.show();
        }else{
          ModalEdicion.show();
        }
        setConsecutivoEdit(obj);
      }
    }

    const GuardarConsecutivo = async(objSave)=> {
      if (objSave) {
          let ListAlert = ValidConsecutivos(objSave.cnsIni,  objSave.cnsFin);

          if (ListAlert.length == 0) {
              let objSend = {
                  empId: 1,
                  tpDID: objSave.tpDID,
                  sucId: objSave.cnsSucursal,
                  cnsId: objSave.cnsId,
                  consecutivoInicial: objSave.cnsIni,
                  consecutivoFinal: objSave.cnsFin
              };

              const response = await SendRequest(objSend, "ConsecutivoDocumentos/Actualizar_Consecutivos");
              if(response?.ok){
                  ReloadDataGRID();
                  ListAlert = [{
                      "title": "Actualización exitosa",
                      "desc":  response.descripcion,
                      "type": "alert-success"
                  }];
                  ModalEdicion.hide();
              }else{
                  if (response.datos) {
                      response.datos.map((error) => {
                          const { mensajeError, cnsId} = error;

                          ListAlert = [...ListAlert, {
                              "title": "Error de validación",
                              "desc":  mensajeError,
                              "type": "alert-warning"
                          }];
                      });
                  
                  }else{
                      ListAlert = [...ListAlert, {
                          "title": "Error de validación",
                          "desc":  response.Descripcion,
                          "type": "alert-warning"
                      }];
                  }
                  if(response.errores){
                      response.errores.map((error) => {
                          const {codigo, descripcion} = error;
                          ListAlert = [...ListAlert, {
                              "title": `Error de validación (${codigo})`,
                              "desc": `${descripcion}`,
                              "type": "alert-warning"
                          }];
                      });
                  }
              }

              if (ListAlert.length > 0) {
                ShowAlerts(ListAlert);
              }
          }else{
            ShowAlerts(ListAlert);
          }

      }
  }
    return (
      <>
          <HeaderMaestros 
              txtTitle="Consecutivo documentos"
              txtSubtitle="AYF"
          />
          

          <div className={"col-sm-12 d-flex " + (ShowSection && "justify-content-end")}>
            <div id="SectionAditional" className={"col-sm-4 scrollAYF" + (ShowSection ? " ShowSection" : "")}>
                  <AdminConsecutivoMensual
                    ConsecutivoSelected={ConsecutivoSelected}
                    EventAlerts={ShowAlerts}
                  />
                  {/* ------------- Component Correspondiente ------- */}
                  <div onClick={() => ShowHideSection()} className="col-sm-auto CSectionClose">
                    <i className="fa-solid fa-arrow-left IconSectionClose"></i>
                    {/* <i class="fa-solid fa-caret-left"></i> */}
                  </div>
            </div>
            <div className={"col-sm-" + (ShowSection ? "8" : "12")}>
                <div className="col-sm-12 mb-4 pt-3 d-flex justify-content-center">
                  <div className={"ps-1 d-flex col-sm-"+ (ShowSection ? "11" : "9")}>
                    <div className="col-sm-3 me-3">
                      <Combobox 
                        ID="ComboSurcusales" 
                        Data={Sucursales}
                        Name="Sucursales Admin"
                        params={
                          {
                            ID: "sucID", 
                            Text: "sucDesc",
                            onSelectEvent: SelectSucursal,
                            onClearEvent: ClearSucursal
                          }
                        }
                      />
                    </div>

                    <div className="col-sm-4">
                      <Combobox 
                        ID="ComboTipoDocumento" 
                        Data={TipoDocumentos}
                        Name="Tipo documentos"
                        params={
                          {
                            ID: "tpDID", 
                            Text: "tpDDesc",
                            ShowID: true,
                            onSelectEvent: SelectTipoDocumento,
                            onClearEvent : ClearTipoDocumento
                          }
                        }
                      />
                    </div>

                  </div>
                    
                </div>

                <div className="col-sm-12 d-flex justify-content-center">
                  <div className={"col-sm-"+ (ShowSection ? "11" : "9")}>
                    {
                      ConsecutivosTD.length > 0 ? 
                      <DataGrid_TDConsecutivo 
                        Datos={ConsecutivosTD}
                        AdminMenEvent={AdministrarConsecutivoMen}
                        EventAlerts={ShowAlerts}
                        EventEditConsecutivo={EditarConsecutivo}
                        ReloadDataGRID={ReloadDataGRID}
                        SucId={SucursalSelected}
                      /> :
                      <div className="col-sm-12 d-flex flex-wrap  align-items-center">
                        <div className="col-sm-12 mt-3 mb-3 d-flex justify-content-center">
                          <i className="fa-solid fa-hand-point-up IconSelect"></i>
                        </div>
                        <div className="col-sm-12 d-flex justify-content-center ">
                          <h5 className="txtSelect" style={{color: "rgba(0,0,0,.7)"}}>Sin consecutivos</h5>
                        </div>
                        <div className="col-sm-12 d-flex justify-content-center ">
                          <p className="txtSelect" style={{color: "rgba(0,0,0,.7)"}}>Filtre una sucursal para ver los consecutivos configurados</p>
                        </div>
                      </div>
                    }
                    
                  </div>
                </div>
            </div>
          </div>
          <Alert ListData={ListAlert} ChangeAlerts={ShowAlerts}/>
          <ModalEditarConsecutivo objEdit={ConsecutivoEdit} EventSaveConsecutivo={GuardarConsecutivo}/>
      </>
    )
}
