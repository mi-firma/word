export class Firma {

    constructor(id, orden, requierePassword, requiereSMS,
                password, tipoNotificacion, nombre, correo, telefono,
                grafoX, grafoY, grafoAlto, grafoAncho, grafoPaginaNumero,
                requiereFirmaDigital) {

        this.id = id;
        this.order = orden;
        this.requiresPassword = requierePassword;
        this.requiresDigitalSignature = requiereFirmaDigital;
        this.requiresSMS = requiereSMS;
        this.password = password;
        this.notificationType = tipoNotificacion;
        this.name = nombre;
        this.email = correo;
        this.phoneNumber = telefono;
        this.x = grafoX;
        this.y = grafoY;
        this.height = grafoAlto;
        this.width = grafoAncho;
        this.page = grafoPaginaNumero;
    }
}
