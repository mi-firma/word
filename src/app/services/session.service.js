class SessionService {
  constructor() { }

  get authority(){
    return localStorage.getItem('homeAccountIdentifier');
  }
  get idCustomer() {
    return localStorage.getItem('idCustomer');
  }

  get userId() {
    return localStorage.getItem('personaId');
  }

  get authId() {
    return localStorage.getItem('authId');
  }

  get identificadorOtp() {
    return localStorage.getItem('identificadorOTP');
  }

  get recoRestrictive() {
    return localStorage.getItem('reconoserRestrictive');
  }

  get otpRestrictive() {
    return localStorage.getItem('otpRestrictive');
  }

  get username() {
    return localStorage.getItem('personaNombre');
  }

  get documentUser() {
    return localStorage.getItem('documento');
  }

  get emailUser() {
    return localStorage.getItem('correo');
  }

  get reconoserGuid() {
    return localStorage.getItem('reconoserGuid');
  }

  get reconoserUrl() {
    return localStorage.getItem('reconoserUrl');
  }

  get validarOtp() {
    return localStorage.getItem('validarOtp');
  }

  get phoneUser() {
    return localStorage.getItem('celular');
  }

  get phoneUser2() {
    return localStorage.getItem('phoneUser');
  }

  get isLogged() {
    return localStorage.getItem('token') != null;
  }

  get isRequestPending() {
    return localStorage.getItem('pendingRequest') != null;
  }

  get isANoob() {
    return localStorage.getItem('noob') === '1';
  }

  get isNoobNull() {
    return localStorage.getItem('noob') == null;
  }

  get firstName() {
    return localStorage.getItem('firstName');
  }

  get lastName() {
    return localStorage.getItem('lastName');
  }

  get customerMobile() {
    return localStorage.getItem('customerMobile');
  }

  get user() {
    return localStorage.getItem('user');
  }

  get userIp() {
    return localStorage.getItem('userIp');
  }


  set signatureGuid(value) {
    localStorage.setItem('firma', value);
  }

  logout() {
    let noob = localStorage.getItem('noob');
    if (noob == null) {
        noob = '1';
    }
    localStorage.clear();
    localStorage.setItem('noob', noob);
  }
}

const sessionService = new SessionService();

export default sessionService;