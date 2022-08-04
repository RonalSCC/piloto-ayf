import DataGridLogs from "./DataGridLogs"
export default function ModalLogs({HistorialCambios}) {
  return (
    <>
        <div className="modal fade" id="ModalLogs" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center position-relative align-items-center">
                        <h4 className="modal-title3" id="exampleModalLabel">Historial cambios</h4>
                        <div className="col-sm-auto CCloseButtonModal">
                            <i type="button"  data-bs-dismiss="modal" data-bs-target="#ModalLogs" aria-label="Close" className="fa-solid fa-circle-xmark IconCloseModal"></i>
                        </div>
                    </div>
                    <div className="modal-body">
                        <DataGridLogs Datos={HistorialCambios}/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
