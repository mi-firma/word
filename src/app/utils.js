// This file contains utility functions used across the application

/**
 * Converts an unsigned array to a uri base64 string
 * @param data Array of unsigned integers data
 */


export function Uint8ArrayToStringBase64(data) {
    let binary = '';
    const len = data.byteLength;

    for (let i = 0; i < len; ++i) {
        binary += String.fromCharCode(data[i]);
    }
    return window.btoa(binary);
}

/**
 * Converts a uri base64 string to an unsigned array
 * @param src Uri base64 data
 */
export function stringToUint(src) {
    const binary = window.atob(src);
    const len = binary.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; ++i) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

export function logout(router) {
    let noob = localStorage.getItem('noob');
    if (noob == null) {
        noob = '1';
    }
    localStorage.clear();
    localStorage.setItem('noob', noob);
    router.navigateByUrl('');
}

/**
 * Given a uri representation of an image of the form data:image/extension;base64, data, it returns the extesion of the image
 * @param base64 uri base64 data
 */
export function getExtensionImageFromURI(base64) {
    if (base64.length <= 22 || base64.substr(0, 4) !== 'data') {
        throw new Error('Invalid URI');
    }
    const l = base64.indexOf(':') + 1;
    if (l !== 5) {
        throw new Error('Invalid URI');
    }
    const type = base64.substr(l, 6);
    if (type !== 'image/') {
        throw new Error('Invalid URI');
    }
    const semicolon = base64.indexOf(';') + 1;

    if (semicolon === 0) {
        throw new Error('Invalid URI');
    }

    const uri = base64.substr(semicolon, 7);

    if (uri !== 'base64,') {
        throw new Error('Invalid URI');
    }

    const extension = base64.substr(l + 6, semicolon - 1 - l - 6);

    return extension.toLowerCase();
}

/**
 * Transforms a URI - base64 to a blob
 */
export function b64toBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'application/pdf' });
}

/**
 * Gets the hexadecimal representation of a rgba color
 */
export function getHexColorFromRgba(color) {
    if (color === 'rgba(158,234,170,0.5)') {
        return '#9eeaaa';
    } else {
        return '#a0daff';
    }
}

/**
 * Returns an object with details about the client machine
 * @param window window object
 */
export function datosMaquina(window) {
    {
        const unknown = 'unknown';

        // browser
        const nVer = navigator.appVersion;
        const nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        let nameOffset;
        let verOffset;
        let ix;

        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        } else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 5);
        } else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        } else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        } else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        } else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        } else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() === browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) {
            version = version.substring(0, ix);
        }
        if ((ix = version.indexOf(' ')) != -1) {
            version = version.substring(0, ix);
        }
        if ((ix = version.indexOf(')')) != -1) {
            version = version.substring(0, ix);
        }

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // system
        var os = unknown;
        const clientStrings = [
            { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows Vista', r: /Windows NT 6.0/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { s: 'Windows CE', r: /Windows CE/ },
            { s: 'Windows 3.11', r: /Win16/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Chrome OS', r: /CrOS/ },
            { s: 'Linux', r: /(Linux|X11(?!.*CrOS))/ },
            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ },
            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }
    }

    return window.jscd = {
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        os: os,
        osVersion: osVersion
    };
}

export function detectWebcam() {
    const mediaDevices = navigator.mediaDevices;

    return new Promise((resolve, reject) => {
      if (!mediaDevices || !mediaDevices.enumerateDevices) {
        console.log('No hay media devices, saltar al próximo paso !');
        resolve(false);
      }

      mediaDevices.enumerateDevices().then((devices) => {
        if (devices.some(device => device.kind === 'videoinput')) {
            resolve(true);
        } else {
            resolve(false);
        }
      }).catch(()=> reject(false));
    });
}