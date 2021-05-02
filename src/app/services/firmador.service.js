const httpOptions = () => ({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("token")
});

const httpOptions2 = () => ({
    'Content-Type': 'application/json',
    'ChannelAuthorization': 'Basic MDJDQ0VFQkEtMTE1Mi00MkY3LThEMUEtREYxREJDRjRBRjA2OjAyMzEyRkU3LTQ5MDUtNEQ1Qy1BQ0I1LTUyQTQ2QzYxMzE5NQ==',
    'TokenCustomer': `Bearer ${localStorage.getItem('token')}`
});

const GatewayMiFirma = "https://olsrvpruwbce01:6741/";
const ApiManager = "https://olsrvpruwbce01:6594/";

class FirmadorService {

  ListarGrafo() {
    return fetch(GatewayMiFirma + `Gateway/api/v1_0/graph/getAll`, {
        method: "GET",
        headers: httpOptions(),
    }).then(response => response.json());
  }

  AdicionarGrafo(base64, nombreGrafo, tipo) {
    const data = {
      file: base64,
      fileName: nombreGrafo,
      fileExtension: tipo
    };
    return fetch(GatewayMiFirma + `Gateway/api/v1_0/graph/save`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions()
    }).then(response => response.json());
  }

  EliminarGrafo(grafoGuid) {
    return fetch(GatewayMiFirma + `Gateway/api/v1_0/graph/delete/${grafoGuid}`, {
        method: "DELETE",
        headers: httpOptions()
    }).then(response => response.json());
  }

  ConfigurarFirma(file, tipoProceso, fileName, destinatarios, firmas) {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    const data = {
      fileData: file,
      fileName: fileName,
      signatureProcessType: tipoProceso,
      signatureExecutionType: 2,
      signers: destinatarios,
      signatures: firmas
    };
    console.log('firmas status:');
    console.log(firmas);
    console.log('data:');
    console.log(data);
    return fetch(GatewayMiFirma + 'Gateway/api/v1_0/document/create', {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions()
    }).then(response => response.json());
  }

  ConfigurarFirma2(fileid, destinatarios, firmas) {
    const documents = [];
    const users = []
    for (let i = 0; i < firmas.length; i++) {
      const data = {
        sign: {
          order: firmas[i].order,
          graphX: firmas[i].x,
          graphY: firmas[i].y,
          highGraph: firmas[i].height,
          weightGraph: firmas[i].width,
          numberPageGraph: firmas[i].page
        },
        user: destinatarios[i].email
      }
      users.push(data)
    }
    const doc = {
      documentId: fileid,
      users: users
    }
    documents.push(doc)
    const data = {
      documents: documents
    };
    return fetch(ApiManager + 'api/v1_0/signature/settings', {
    //return fetch(ApiManager + 'api/v1_0/eSignature/signElectronically', {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions2()
    }).then(response => response.json());
  }

  uploadDoc(filename, filebase64) {
    const data = {
      fileName: filename,
      fileBase64: filebase64
    }
    return fetch(ApiManager + 'api/v1_0/document/upload', {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions2()
    }).then(response => response.json());
  }

  getToSign(infopro){
    const data = {
      infoProcess:infopro
    }
    return fetch(ApiManager + 'api/v1_0/documents/getToSign', {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions2()
    }).then(response => response.json());
  }

  EjecutarFirma(solicitudFirmaGuid, signerName, grafoGuid,
    fileData, documentoSerial) {
    const data = {
      signatureRequestGuid: solicitudFirmaGuid,
      signerName,
      fileData,
      documentSerial: documentoSerial,
      graphGuid: grafoGuid
    };
    console.log('Data 2:');
    console.log(data);
    return fetch(GatewayMiFirma + 'Gateway/api/v2_0/document/sign', {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions()
    }).then((response) => {
      console.log("Fetched: ");
      console.log(response);
      console.log("before1: ");
      console.log(response.status);
      console.log("before2: ");
      console.log(response.statusText);
      return response;
      //return response.json();
    });
  }

  ObtenerDocumento(guidFirma) {
    return fetch(GatewayMiFirma + `Gateway/api/v1_0/documents/sign/${guidFirma}`, {
        method: "GET",
        headers: httpOptions(),
    }).then(response => response.json());
  }

  ObtenerDocumentoV2(guidFirma) {
    const data = {
      infoProcess: guidFirma
    };
    return fetch(GatewayMiFirma + `Gateway/api/v2_0/document/getToSign/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions()
    }).then(response => response.json());
  }

  ObtenerFirmantesDocumento(guidFirmantes) {
    return fetch(GatewayMiFirma + `Gateway/api/v1_0/signers/${guidFirmantes}`, {
        method: "GET",
        headers: httpOptions(),
    }).then(response => response.json());
  }

  ObtenerFirmasDisponibles(identificacion) {
    const data = {
      tipoIdentificacionNombre: 'CC',
      personaIdentificacion: identificacion
    };
    return fetch(GatewayMiFirma + `Firmador/ObtenerCantidadFirmas/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions()
    }).then(response => response.json());
  }

  EnviarRecordatorio(guidFirma, nombreFirmante, nombreSolicitante, nombreDocumento, correo, notificacionId, opcionCorreo) {
    const data = {
      requestToken: guidFirma,
      signerName: nombreFirmante,
      requesterName: nombreSolicitante,
      fileName: nombreDocumento,
      email: correo,
      notificacionContactoId: notificacionId,
      emailOption: opcionCorreo
    };
    return fetch(GatewayMiFirma + `Gateway/api/v1_0/signers/reminder`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions()
    }).then(response => response.json());
  }

  ActualizarPersona(solicitudFirmaToken, correo) {
    const data = {
      token: solicitudFirmaToken,
      email: correo
    }
    return fetch(GatewayMiFirma + `Gateway/api/v1_0/signers/edit/email`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions()
    }).then(response => response.json());
  }

  EliminarFirmante(solicitudFirmaToken) {
    return fetch(GatewayMiFirma + `Gateway/api/v1_0/signers/${solicitudFirmaToken}`, {
        method: "DELETE",
        headers: httpOptions(),
    }).then(response => response.json());
  }

  changeStateSign(array) {
    const data = {
      associateGraphRequests: array
    };
    return fetch(GatewayMiFirma + `Gateway/api/v1_0/signature/changeSignState`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions()
    }).then(response => response.json());
  }
}

const firmadorService = new FirmadorService();

export default firmadorService;