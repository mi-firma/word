const httpOptions = {
    'Content-Type': 'application/json',
    'ChannelAuthorization': 'Basic MDJDQ0VFQkEtMTE1Mi00MkY3LThEMUEtREYxREJDRjRBRjA2OjAyMzEyRkU3LTQ5MDUtNEQ1Qy1BQ0I1LTUyQTQ2QzYxMzE5NQ=='
};

const httpOptions3 = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("token")
};

const httpOptions2 = () => ({
    'Content-Type': 'application/json',
    'ChannelAuthorization': 'Basic MDJDQ0VFQkEtMTE1Mi00MkY3LThEMUEtREYxREJDRjRBRjA2OjAyMzEyRkU3LTQ5MDUtNEQ1Qy1BQ0I1LTUyQTQ2QzYxMzE5NQ==',
    'Authorization': 'Bearer ' + localStorage.getItem("token")
});

const url = "https://olsrvpruwbce01:6595/";
const GatewayMiFirma = "https://olsrvpruwbce01:6741/";

export class GatewayService {

    acceptTerms(userIp, idCustomer) {
        const data = {
            publicIP: userIp,
            customerId: parseInt(idCustomer),
            termsId: [7,8],
        }
        console.log('DATA ACC:');
        console.log(data);
        return fetch(`${url}Gateway/api/v2_0/terms/acceptance`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: httpOptions,
        }).then(response => response.json());
    }

    createCustomer(name, lastname, password, user, mobile, ip) {
        const data = {
            firstName: name,
            lastName: lastname,
            password: password,
            user: user,
            customerMobile: mobile,
            publicIP: ip,
        }
        return fetch(`${url}Gateway/api/v2_0/createCustomer`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: httpOptions,
        }).then(response => response.json());
    }
    validateUser(user, phonenumber, ip, browser, userAgent, os, mobile, tablet,
        desktop, camera, secondcamera, fingerprint, processCode, authId) {
        const data = {
            user: user,
            phoneNumber: phonenumber,
            deviceInfo: {
                publicIp: ip,
                browser: browser,
                os: os,
                isMobile: mobile,
                isTablet: tablet,
                isDesktop: desktop,
                hasCamera: camera,
                hasSecondaryCamera: secondcamera,
                hasFingerprintReader: fingerprint
            }
        }
        if (processCode !== "" || processCode !== undefined) data.processCode = processCode;
        if (authId !== "" || authId !== undefined) data.authId = authId;
        console.log(`processCode: ${processCode}`);
        console.log(`authId: ${processCode}`);
        console.log(data);
        return fetch(`${url}Gateway/api/v2_0/validate/user`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: httpOptions,
        }).then(response => response.json());
    }
    validate(guid, data) {
        const val = {
            guid: guid,
            data: data
        }
        console.log(val);
        return fetch(`${url}Gateway/api/v2_0/validate`, {
            method: "POST",
            body: JSON.stringify(val),
            headers: httpOptions,
        }).then(response => response.json());
    }

    getTerms() {
        return fetch(`${url}Gateway/Terms`).then(response => response.json());
    }

    getEspecificTerms(ids) {
        let id = "";
        for (let i = 0; i < ids.length; i++) {
            id += "ids=" + ids[i] + "&"
        }

        id = id.slice(0, -1)

        return fetch(`${url}Gateway/EspecificTerms/${id}`).then(response => response.json());
    }

    resetPassword(pass) {
        const data = {
            newPassword: pass,
        }
        return fetch(`${url}Gateway/ResetPassword`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: httpOptions2(),
        }).then(response => response.json());
    }

    addToMiFirma(name, email, phoneNumber) {
        const data = {
            name: name,
            email: email,
            phoneNumber: parseInt(phoneNumber)
        }
        return fetch(`${GatewayMiFirma}Gateway/api/v1_0/user/create`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: httpOptions,
        }).then(response => response.json());
    }

    uploadSignature(file, fileName, fileExtension) {
        console.log(httpOptions3);
        const data = {
            file: file,
            fileName: fileName,
            fileExtension: fileExtension
        }
        const path = `${GatewayMiFirma}Gateway/api/v1_0/graph/save`;
        //console.log(path);
        //console.log(data);
        return fetch(path, {
            method: "POST",
            body: JSON.stringify(data),
            headers: httpOptions3
        }).then(response => response.json());
    }

    getValidationParameter(user) {
        const path = `${url}Gateway/api/v2_0/customers/getValidationParameter/${user}`;
        return fetch(path, {
            method: "GET",
            headers: httpOptions
        }).then(response => response.json());
    }

    getUserTerms() {
        const path = `${url}Gateway/api/v3_0/terms/enabled`;
        return fetch(path, {
            method: "GET",
            headers: httpOptions
        }).then(response => response.json());
    }

    activateAccount(activator) {
        const data = {
            activator: activator,
        }
        return fetch(`${url}Gateway/api/v2_0/customers/activateAccount`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: httpOptions,
        }).then(response => response.json());
    }


}

const gatewayService = new GatewayService();

export default gatewayService;