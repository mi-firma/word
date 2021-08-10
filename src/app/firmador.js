/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
import store from './store/index.js'; 
import gatewayService from './services/gateway.service.js';
import filedataService from './services/filedata.service.js';
import sessionService from './services/session.service.js';
import firmadorService from './services/firmador.service.js';
import * as Utils from './utils.js';
import { Point } from './models/point.model.js';
import { Dimension } from './models/dimension.model.js';
import { Destinatario } from './models/destinatario.model.js';
import { Firma } from './models/firma.model.js';
import Jimp from 'jimp';
import * as attention from './attention.js';
import "./lib/webviewer/webviewer.min.js";

// images references in the manifest
import "../../assets/icon-16.png";
import "../../assets/icon-32.png";
import "../../assets/icon-80_1.png";
import "../../assets/information-button.svg";
import "../../assets/img-esign4x.png";

const licenseKey = 'OLIMPIA IT SAS(olimpiait.com):OEM:MiFirma::B+:AMS(20211027):88B5E2D204D7380AB360B13AC9A2737860612FEDB9C3F535E57C699658E5832D8969BEF5C7';

const AnnotationType = {
    DATE: 1,
    INITIALS: 2,
    TEXT: 3,
    SIGNATURE: 4
}

const phoneNumber = localStorage.getItem("phoneUser");

let wvInstance;
let contador = 0;
let signingData;

let files;
let file;

let signers = [{
    tipo: 'Yo',
    nombre: sessionService.username, 
    correo: sessionService.emailUser,
    annotations: [],
}];
store.dispatch('setSigners',  signers );
let firmante;
let firmanteIndex;

let otros;

let colors = [
    'rgba(158,234,170, 0.5)', 'rgba(160,218,255, 0.5)', 'rgba(240, 240, 36, 0.5)',
    'rgba(158,38,125, 0.5)', 'rgba(227, 34, 63, 0.5)', 'rgba(227, 156, 34, 0.5)',
    'rgba(26, 219, 219, 0.5)', 'rgba(19, 111, 209, 0.5)', 'rgba(190, 78, 242, 0.5)',
];

let color;

//annotationType = AnnotationType;

let isSignaturesMenuShowing = false;
let showMobileMenu = false;

let largestHeight;
let largestWidth;

let maximumSignatures = 4;
let signatures = [];
let signature = '';
let grafoGuid;

let signatureCount = 0;

let userIp;

let originalDimension;

let mySubscription;
let mySubscription2;

let hasCamera;

let isTemplate = false;

let documentReady;

let stampWidth = 601;
let stampHeight = 155;

let hasSignYo = true;


/* global document, Office, Word */
Office.onReady(async () => {
    await componentDidMount();
});

async function componentDidMount() {
    //cargadorService.startLoading();
    await init();
    // await getFiles();
    await vwinit();
    //if (isTemplate) {
    //    await loadAnnotations();
    //}
    //otros = getTipoFlujo() === 3;
    //cargadorService.stopLoading();
}

async function init() {
    filedataService.getIp().then((respuesta) => {
        userIp = respuesta.ip;
    }).catch(() => {
        userIp = '127.0.0.1';
    });
    const inputEl = document.getElementById('fileElem');
    document.getElementById('drop-area').addEventListener('click', () => {
        document.getElementById('fileElem').click();
    });
    document.getElementById("docName").innerHTML = localStorage.getItem("word-document-name1");
    inputEl.addEventListener('change', handleFiles);
    document.getElementById('add-sign').addEventListener('click', loadFirstSignature);
    document.getElementById('signature-text').value = sessionService.firstName + " " + sessionService.lastName;
    
    //loadFirstSignature();
    retrieveSignatures();

    /*
    mySubscription2 = fdService.firmantesListener$.subscribe(firmantes => {
      signers = firmantes;

      if (signers[0].annotations) {
        isTemplate = true;
      }

    });
    */
   chooseSigner(0);

    if (window.innerWidth < 640) {
        largestHeight = 50;
        largestWidth = 150;
    } else {
        largestHeight = 110;
        largestWidth = 450;
    }

    hasCamera = await Utils.detectWebcam();
    let nameContent = document.getElementById("signer-name").innerHTML;
    document.getElementById("signer-name").innerHTML = sessionService.username + nameContent;
    //document.getElementById("signerName").innerHTML = sessionService.username + nameContent;
    document.getElementById("continue-btn").addEventListener("click", () => { continuar() });
    [...document.getElementsByClassName("signer__item")].forEach(e => {
        e.addEventListener("click", (e) => {
            console.log("clicked on:");
            console.log(AnnotationType[e.target.id]);
            createAnnot(AnnotationType[e.target.id]);
        })
    });
}

function loadFirstSignature() {
    document.getElementById("load-banner").style.display = "none";
    const modal = document.getElementById("modal-signature");
    const form = document.getElementById("signature-upload");
    modal.style.display = "inline-block";
    form.addEventListener("submit", e => {
        e.preventDefault();
        retrieveSignatures();
        modal.style.display = "none";
        console.log('Exit Form');
    });
}


function retrieveSignatures() {

    firmadorService.ListarGrafo().then((Respuesta) => {
        if (Respuesta.status_code == 200 || Respuesta.status_code == 201) {
            if (Respuesta.data.graphs != null) {
                signatures = Respuesta.data.graphs;
                for (const signature of signatures) {
                    signature.archivo = `data:image/${signature.tipoImagen};base64,${signature.archivo}`;
                }
                if (signatures.length > maximumSignatures) {
                    signatures.splice(0, signatures.length - maximumSignatures);
                }
            } else {
                signatures = [];
            }
            /*
            let options = '<option value="">Elige una firma</option>';
            signatures.forEach((s, i) => {
                options += `<option class="signature-option" value="${i}"> Firma ${i+1}</option>`;
                // options += `<option class="signature-option" value="${i}"> Firma ${s.guid}</option>`;
            })
            const signatureSelect = document.getElementById("signatures");
            signatureSelect.innerHTML = options;
            signatureSelect.addEventListener('change', (e) => {
                const { value } = e.target;
                console.log(value);
                onSignatureUriChange(signatures[value].archivo)
                onSignatureGuidChange(signatures[value].guid)
            });
            */
            //new
            
            //store.state.signers = signers;
            let signs = '<div class="options">';
            signs += `<div class="option">`;
            signs +=  `<input type="radio" name="firma" value="" id="firma-" checked />`;
            signs +=  `<label for="firma-" style="text-align: center;">`;
            signs +=  ` Elige una firma`;
            signs +=  `</label>`;
            signs += `</div>`;  
            signatures.forEach((s, i) => {
                signs += `<div class="option">`;
                signs +=  `<input type="radio" name="firma" value="${i}" id="firma-${i}" />`;
                signs +=  `<label for="firma-${i}">`;
                signs +=  `<img src="http://placehold.it/22/ff${i+1}000/ff${i+1}fff" id="f_${i}" alt="${s.guid}" style="height: 50px;"/>  `;
                signs +=  `</label>`;
                signs += `</div>`;
            })
            signs += '</div>';
            const sS = document.getElementById("signatures-new");
            sS.innerHTML = signs;

            /*sS.addEventListener('click', (e) => {
                console.log(e.target.value);
                const { val } = e.target.value;
                console.log(val);
                onSignatureUriChange(signatures[val].archivo)
                onSignatureGuidChange(signatures[val].guid)
            });*/
            addJSToSigns();
            addJSToRads();
            //end new
        } else if (Respuesta.status_code == 204) {
            signatures = [];
            loadFirstSignature();
        } else if (Respuesta.status_code == 401) {
            sessionService.logout();
        } else {
            //// router.navigateByUrl('main/errorMifirma', { skipLocationChange: true });
        }
    });
}

function base64ToBlob(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return new Blob([bytes], { type: 'application/pdf' });
};

async function vwinit() {
    console.log('Hello World');
    const viewer = document.getElementById('viewer');

    wvInstance = await WebViewer({
        licenseKey,
        path: './lib/webviewer',
        css: './lib/webviewer/custom/styles.css',
        enableFilePicker: false,
        fullAPI: true,
        disabledElements: [
            'header',
            'toolsHeader',
            'pageNavOverlay',
            'contextMenuPopup',
            'annotationCommentButton',
            'linkButton',
            'annotationGroupButton',
            'textPopup'
        ],
    }, viewer);

    wvInstance.setLanguage('es');

    turnOffHotkeys();

    addCustomActions();

    const { annotManager, docViewer, Annotations } = wvInstance;
    //console.log("before");
    //console.log(localStorage.getItem('word-document1'));
    const doc = localStorage.getItem('word-document1');
    console.log("PDF Cargado:");
    console.log(doc);
    const blob = base64ToBlob(doc);
    wvInstance.loadDocument(blob, { filename: "test" });

    wvInstance.setFitMode(wvInstance.FitMode.FitWidth);

    annotManager.on('annotationChanged', (annotations, action) => {
        if (action === 'delete') {
            annotations.forEach(annot => {
                if (annot.getCustomData('type') === AnnotationType.SIGNATURE) {
                    if (hasSignYo) {
                        signatureCount--;
                    }
                }
            });
            //detector.detectChanges();
        }
    });

    annotManager.on('annotationSelected', (annotations, action) => {
        if (action === 'selected') {
            wvInstance.disableElements([
                'alignText'
            ]);
            annotations.forEach(annot => {
                if (annot instanceof Annotations.FreeTextAnnotation) {
                    wvInstance.enableElements([
                        'alignText'
                    ]);
                }
            });

            if (window.innerWidth < 640) {
                wvInstance.enableElements([
                    'annotationCommentButton'
                ]);
                annotations.forEach(annotation => {
                    if (annotation instanceof Annotations.StampAnnotation) {
                        wvInstance.disableElements([
                            'annotationCommentButton'
                        ]);
                    }
                });
            }
        }
    });

    docViewer.on('documentLoaded', () => {
        console.log("Documento cargado bien");
        documentReady = true;
    });
}

/**
   * Disables hotkeys which won't be suppported in the application
   */
function turnOffHotkeys() {
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.CTRL_C);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.COMMAND_C);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.CTRL_V);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.COMMAND_V);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.CTRL_F);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.COMMAND_F);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.CTRL_0);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.COMMAND_0);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.CTRL_P);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.COMMAND_P);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.SPACE);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.A);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.C);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.E);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.F);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.I);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.L);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.N);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.O);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.R);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.T);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.S);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.G);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.H);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.K);
    wvInstance.hotkeys.off(wvInstance.hotkeys.Keys.U);
}

function addCustomActions() {

    function changeAnnotationAlignment() {
        const { annotManager, Annotations } = wvInstance;
        const annots = annotManager.getSelectedAnnotations();

        annots.forEach(annot => {
            if (annot instanceof Annotations.FreeTextAnnotation) {
                if (annot.TextAlign === 'center') {
                    annot.TextAlign = 'left';
                } else {
                    annot.TextAlign = 'center';
                }
                annotManager.redrawAnnotation(annot);
            }
        });
    }

    wvInstance.annotationPopup.add([{
        type: 'actionButton',
        img: 'assets/icons/icon-menu-centre-align.svg',
        dataElement: 'alignText',
        onClick: changeAnnotationAlignment,
    }]);
}

/**
 * Loads annotations into the document if there are any
 
async function loadAnnotations() {
    wvInstance.docViewer.on('documentLoaded', async () => {
        const annotManager = wvInstance.annotManager;

        signers.forEach(async firmante => {
            await annotManager.importAnnotations(firmante.annotations);
        });

        const annotationsList = annotManager.getAnnotationsList().filter(annot => {
            return annot.getCustomData('MiFirma');
        });

        const deleteAnnot = [];
        let i = 0;
        const temp = [];
        colors = [];

        annotationsList.forEach((annot) => {
            if (!colors.includes(annot.CustomData.color)) {
                colors.push(annot.CustomData.color);
            }
            if (temp.length === 0) {
                temp.push(annot.getCustomData('rol'));
            } else {
                if (temp[temp.length - 1] !== annot.getCustomData('rol')) {
                    temp.push(annot.getCustomData('rol'));
                    i++;
                }
            }
            annot.setCustomData('index', i);
            annot.setCustomData('owner', signers[i].correo);
            annot.setCustomData('nombreFir', signers[i].nombre);
            if (annot.getCustomData('type') === AnnotationType.SIGNATURE) {
                deleteAnnot.push(annot);
            }
        });
        chooseSigner(0);

        for (const annot of deleteAnnot) {
            if (annot.CustomData.rol === 'Yo') {
                originalDimension.push(new Dimension(annot.getWidth(), annot.getHeight()));
            }
            annotManager.deleteAnnotation(annot);
            signatureCount++;
            const { Annotations } = wvInstance;
            const annotation = new Annotations.StampAnnotation();
            let signatureIcon;
            if (annot.CustomData.rol === 'Yo') {
                signatureIcon = await Jimp.read('/assets/img/clic-imagen2.png');
            } else {
                const fontOtherSigners = '/assets/fonts/open-sans-32-black.txt';
                signatureIcon = new Jimp(300, 40, annot.getCustomData('color'));
                const [name] = annot.CustomData.nombreFir.split(' ');

                const font = await Jimp.loadFont(fontOtherSigners);
                signatureIcon.print(
                    font, 0, 0,
                    {
                        text: `Firma ${name}`,
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                    },
                    signatureIcon.bitmap.width,
                    signatureIcon.bitmap.height
                );
                signatureCount++;
            }

            const signatureIconBase64 = await signatureIcon.getBase64Async(Jimp.MIME_PNG);

            annotation.PageNumber = annot.getPageNumber();
            annotation.X = annot.getX();
            annotation.Y = annot.getY();
            annotation.Width = annot.getWidth();
            annotation.Height = annot.getHeight();
            annotation.NoMove = true;
            annotation.NoResize = true;
            annotation.NoRotate = true;
            annotation.ImageData = signatureIconBase64;
            annotation.CustomData = annot.CustomData;

            annotManager.addAnnotation(annotation, false);

            annotManager.redrawAnnotation(annotation);
        }

        const annots = annotManager.getAnnotationsList().filter(annot => {
            return annot.getCustomData('MiFirma');
        });

        const annotations = wvInstance.Annotations;
        let hasSign = false;
        for (const annot of annots) {
            annot.NoMove = true;
            annot.NoResize = true;
            annot.NoRotate = true;
            if (annot.CustomData.rol === 'Yo') {
                annot.Locked = true;
                if (annot.CustomData.type === AnnotationType.SIGNATURE) {
                    annot.NoResize = false;
                    annot.Locked = false;
                    hasSign = true;
                }
                annot.FillColor = new annotations.Color(160, 218, 255, 0);
                annot.StrokeColor = new annotations.Color(160, 218, 255, 0);
                setAnnotationContent(annot);
            } else {
                setAnnotationContent(annot);
                annot.ReadOnly = true;
            }
        }

        const me = signers.find(signer => signer.tipo === 'Yo');
        if (!hasSign && me) {
            signatureCount++;
            hasSignYo = false;
            isSignaturesMenuShowing = false;
        }

        //detector.detectChanges();

    });
}
*/

/**
 * Initializes the current file as an array of bytes
 * @param file The object file to be converted to an array of bytes
 */
async function setFile(file) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = (e) => {
            file = new Uint8Array(e.target.result);
            resolve();
        };
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Hides/Shows the signers menu
 * function should only be used for mobile devices
 */
function toggleSignerMenu() {
    showMobileMenu = !showMobileMenu;
}

/**
 * Hides/Shows the list of signatures
 */
function toggleSignaturesList() {
    isSignaturesMenuShowing = !isSignaturesMenuShowing;
}

/**
 * Creates a new annotation which will be drawn on the docviewer.
 * Note that method validates that there is only one annotation of type signature for each signer
 * @param type The type of annotation (Signature - Initials - Date - Text)
 */
async function createAnnot(type) {
    const { Annotations, annotManager, docViewer } = wvInstance;

    if (!documentReady) {
        return;
    }

    if (firmante.tipo === 'Yo' && type === AnnotationType.SIGNATURE && !signature) {
        return;
    }

    const annots = annotManager.getAnnotationsList().filter((annot) => {
        return annot.getCustomData('MiFirma') && annot.CustomData.index === firmanteIndex;
    });

    if ((type === AnnotationType.SIGNATURE)) {
        if (annots.some(annot => AnnotationType.SIGNATURE === annot.getCustomData('type'))) {
            return;
        }
    }

    let annotation;
    let signatureIcon;

    if (type !== AnnotationType.SIGNATURE) { //Regular annotations
        annotation = new Annotations.FreeTextAnnotation();
        annotation.setCustomData('index', firmanteIndex);
        annotation.setCustomData('MiFirma', true);
        annotation.setCustomData('type', type);
        annotation.setCustomData('owner', firmante.correo);
        annotation.setCustomData('rol', firmante.tipo);

        const [page, height] = getVerticalLocationWithOffset(docViewer, 100, 20);

        annotation.PageNumber = page;
        annotation.X = 100;
        annotation.Y = height;
        annotation.Width = 100;
        annotation.Height = 20;
        annotation.FillColor = new Annotations.Color(255, 255, 255, 0);
        annotation.TextColor = new Annotations.Color(0, 0, 0);
        annotation.FontSize = '12pt';
        annotation.TextAlign = 'center';
        annotation.StrokeThickness = 1;
        annotation.StrokeColor = new Annotations.Color(255, 255, 255, 0);
        annotation.setPadding(new Annotations.Rect(0, 0, 0, 0));
        annotation.Locked = false;
        annotation.ReadOnly = false;
        annotation.LockedContents = false;
        annotation.NoMove = false;
        annotation.NoResize = false;

        if (firmante.tipo !== 'Yo') {

            if (isTemplate) {

                const [r, g, b] = [parseInt(color.slice(1, 3), 16),
                parseInt(color.slice(3, 5), 16),
                parseInt(color.slice(5, 7), 16)];

                annotation.FillColor = new Annotations.Color(r, g, b, 0.5);
            } else {
                const [r, g, b, a] = color.replace(/rgba\(|\)|\s/, '').split(',').map(c => parseFloat(c));
                annotation.FillColor = new Annotations.Color(r, g, b, a);
            }

            annotation.setContents(type === AnnotationType.INITIALS ? 'Iniciales' :
                type === AnnotationType.DATE ? 'Fecha' : 'Texto');
        } else {
            setAnnotationContent(annotation);
        }

    } else { //Signature annotation
        signatureCount++;
        console.log("signature count:");
        console.log(signatureCount);
        console.log("Firmante tipo:");
        console.log(firmante.tipo);
        annotation = new Annotations.StampAnnotation();
        annotation.setCustomData('MiFirma', true);
        annotation.setCustomData('index', firmanteIndex);
        annotation.setCustomData('owner', firmante.correo);
        annotation.setCustomData('type', type);
        annotation.setCustomData('rol', firmante.tipo);
        if (firmante.tipo === 'Yo') {
            if (!hasSignYo && isTemplate) {
                signatureCount--;
            }
            signatureIcon = await Jimp.read(signature);
            signatureIcon.scan(0, 0, signatureIcon.bitmap.width, signatureIcon.bitmap.height, (x, y, i) => {
                if (signatureIcon.bitmap.data[i + 3] === 0) {
                    signatureIcon.setPixelColor(Jimp.rgbaToInt(255, 255, 255, 2), x, y);
                }
            });
        } else {
            const fontOtherSigners = '/assets/fonts/open-sans-32-black.txt';
            signatureIcon = new Jimp(300, 40, Utils.getHexColorFromRgba(color));
            const [name] = firmante.nombre.split(' ');

            const font = await Jimp.loadFont(fontOtherSigners);
            signatureIcon.print(
                font, 0, 0,
                {
                    text: `Firma ${name}`,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                },
                signatureIcon.bitmap.width,
                signatureIcon.bitmap.height
            );
        }

        const signatureIconBase64 = await signatureIcon.getBase64Async(Jimp.MIME_PNG);

        const [dimensions] = await scaleImageToFit(
            signatureIconBase64,
            new Point(100, 100),
            new Dimension(largestWidth, largestHeight));

        const [page, height] = getVerticalLocationWithOffset(docViewer, 100, 20);

        annotation.PageNumber = page;
        annotation.X = 100;
        annotation.Y = height;
        annotation.Width = dimensions.width;
        annotation.Height = dimensions.height;
        annotation.Locked = false;
        annotation.ReadOnly = false;
        annotation.LockedContents = false;

        annotation.ImageData = signatureIconBase64;
    }

    annotManager.addAnnotation(annotation, {
        imported: false,
        isUndoRedo: false,
        autoFocus: false
    });
    annotManager.deselectAllAnnotations();
    annotManager.selectAnnotation(annotation);
    annotManager.redrawAnnotation(annotation);
}

/**
 * Returns the vertical position (page and y-coordinate) of the current viewer
 * in docViewer coordinates.
 *
 * Note that if the current page in the docviewer does not have enough space to allow for the
 * minimum margin bottom, the next page will be returned.
 *
 * @param docViewer The docViewer object
 * @param offset The y-offset to apply to the current viewer position
 * @param marginBottom The minimum margin bottom which can be permitted
 */
function getVerticalLocationWithOffset(docViewer, offset, marginBottom) {
    const scrollY = docViewer.getScrollViewElement().scrollTop;

    const displayMode = docViewer.getDisplayModeManager().getDisplayMode();

    const topLeft = displayMode.pageToWindow({ x: 0, y: 0 }, 1);

    let page = 1;
    let totalHeight = 0;

    for (const dy = scrollY + topLeft.y; page < docViewer.getPageCount() + 1; ++page) {
        totalHeight += docViewer.getPageHeight(page);
        const height = displayMode.pageToWindow({ x: 0, y: totalHeight }, 1).y;
        if (dy - height < 0) {
            break;
        }
    }

    let Y = displayMode.windowToPage({
        x: 0,
        y: scrollY + topLeft.y
    }, page).y;

    if (Y + offset > docViewer.getPageHeight(page) - marginBottom) {
        ++page;
        Y = offset;
    } else {
        Y += offset;
    }

    return [page, Y];
}

/**
 * Sets the annotation content depending on the type of annotation
 * @param annot The annotation whose content should be set
 */
function setAnnotationContent(annot) {
    switch (annot.CustomData.type) {
        case AnnotationType.DATE:
            annot.setContents(`${new Date().toLocaleDateString('es-CO')}`);
            break;
        case AnnotationType.INITIALS:
            annot.setContents(`${sessionService.username
                .trim()
                .split(/\s+/)
                .reduce((previous, current) => {
                    return previous + current[0];
                }, '')
                .toUpperCase()}`);
            break;
        case AnnotationType.TEXT:
            annot.setContents('Texto 1');
            break;
    }
}

/**
 * Returns a new dimension for the image given the maximum allowed dimensions.
 * The aspect ratio of the image is preserved.
 * Note that also returns a new point, which is centered with respect to the maximum allowed dimensions.
 * point can be ignored if it does not need to be used.
 * @param uriImage The encoded image (Base64)
 * @param coordinates The original coordinates - If you do not need the new point, you can pass anything here.
 * @param maxDims The dimensions of the box constraint
 */
async function scaleImageToFit(uriImage, coordinates, maxDims) {

    const img = await Jimp.read(uriImage);
    const dimensions = new Dimension(img.getWidth(), img.getHeight());

    if (img.getWidth() > maxDims.width) {
        const scale = maxDims.width / img.getWidth();
        dimensions.width *= scale;
        dimensions.height *= scale;
    }

    if (dimensions.height > maxDims.height) {
        const scale = maxDims.height / dimensions.height;
        dimensions.width *= scale;
        dimensions.height *= scale;
    }

    const moveX = (maxDims.width) - (dimensions.width);
    const moveY = (maxDims.height) - (dimensions.height);

    coordinates.translate(moveX / 2, - moveY / 2);

    return [dimensions, coordinates];
}

/**
 * Event which triggers when a signature is selected.
 * also triggers if the current selected signature is selected again.
 * @param base64 The encoded image (Base64)
 */
async function onSignatureUriChange(base64) {
    signature = base64;
    isSignaturesMenuShowing = false;

    const { annotManager } = wvInstance;
    const [signatureAnnot] = annotManager.getAnnotationsList().filter((annot) => {
        const fromMiFirma = annot.getCustomData('MiFirma');
        const type = annot.getCustomData('type');
        const rol = annot.getCustomData('rol');
        return fromMiFirma && type === AnnotationType.SIGNATURE && rol === 'Yo';
    });
    if (signatureAnnot) {
        const signatureIcon = await Jimp.read(signature);
        signatureIcon.scan(0, 0, signatureIcon.bitmap.width, signatureIcon.bitmap.height, (x, y, i) => {
            if (signatureIcon.bitmap.data[i + 3] === 0) {
                signatureIcon.setPixelColor(Jimp.rgbaToInt(255, 255, 255, 2), x, y);
            }
        });
        const signatureIconBase64 = await signatureIcon.getBase64Async(Jimp.MIME_PNG);
        const [dimensions] = await scaleImageToFit(
            signatureIconBase64,
            new Point(signatureAnnot.getX(), signatureAnnot.getX()),
            isTemplate ? new Dimension(originalDimension[0].width, originalDimension[0].height) :
                new Dimension(largestWidth, largestHeight));
        signatureAnnot.Width = dimensions.width;
        signatureAnnot.Height = dimensions.height;
        signatureAnnot.ImageData = signatureIconBase64;
        annotManager.redrawAnnotation(signatureAnnot);
        annotManager.selectAnnotation(signatureAnnot);
        return;
    }

    createAnnot(AnnotationType.SIGNATURE);
}

/**
 * Event which triggers when a signature is selected
 * also triggers if the current selected signature is selected again.
 * @param guidSignature The GUID identifier for the new signature
 */
function onSignatureGuidChange(guidSignature) {
    if (isTemplate && !grafoGuid) {
        console.log(hasSignYo)
        if (hasSignYo) {
            signatureCount++;
        }
    }
    grafoGuid = guidSignature;
}

/**
 * Selects a new signer.
 * @param i The index of the signer to be selected
 */
function chooseSigner(i) {
    console.log("Signer: ")
    console.log(i);
    firmante = signers[i];
    firmanteIndex = i;
    color = colors[i % colors.length];
    isSignaturesMenuShowing = true;
    if (firmante.tipo !== 'Yo') { //Otros: Boton de Firma visible
        document.getElementById('SIGNATURE').style.display = 'flex';
        document.getElementById('signatures-new').style.display = 'none';
        
        signature = '';
        isSignaturesMenuShowing = false;
    } 
    else {
        document.getElementById('signatures-new').style.display = 'flex';
        document.getElementById('SIGNATURE').style.display = 'none';
        }
    showMobileMenu = false;
}

/**
 * Starts the signing process of the document
 */
async function continuar() {
    document.getElementById("load-banner").style.display = "block";
    if (wvInstance) {

        const { docViewer, annotManager } = wvInstance;

        const doc = docViewer.getDocument();

        const [signatureAnnot] = annotManager.getAnnotationsList().filter((annot) => {
            const fromMiFirma = annot.getCustomData('MiFirma');
            const type = annot.getCustomData('type');
            const rol = annot.getCustomData('rol');
            return fromMiFirma && type === AnnotationType.SIGNATURE && rol === 'Yo';
        });

        if (signatureAnnot) {
            const x = signatureAnnot.getX();
            const y = signatureAnnot.getY();
            const width = signatureAnnot.getWidth();
            const height = signatureAnnot.getHeight();
            const pageNumber = signatureAnnot.getPageNumber();
            const image = signatureAnnot.ImageData;
            const signerName = localStorage.getItem('personaNombre');

            const pdfCoordinates = doc.getPDFCoordinates(pageNumber, x, y);

            signingData = {
                signerName,
                pageNumber,
                x,
                y,
                width,
                height,
                image,
                pdfCoordinates,
                signatureGUID: grafoGuid,
            };
            console.log('Signing Data:');
            console.log(signingData)
        } else {
            if (isTemplate) {
                const { annotManager, docViewer } = wvInstance;
                const doc = docViewer.getDocument();

                const freeTextsWidgetAnnots = annotManager.getAnnotationsList().filter((annot) => {
                    const fromMiFirma = annot.getCustomData('MiFirma');
                    const rol = annot.getCustomData('rol');
                    return fromMiFirma && rol === 'Yo';
                });

                const xfdfString = await annotManager.exportAnnotations({ annotList: [...freeTextsWidgetAnnots] });
                const options = { xfdfString, flatten: true };
                const data = await doc.getFileData(options);
                file = new Uint8Array(data);
                if (getTipoFlujo() !== 3) {
                    signers.shift();
                } else {
                    console.log('Proceso 3 no manejado...')
                }
            }
        }
        validateUser();
    }
}

/**
 * Validates the user identity with one-time password authentication
 */
function validateUser() {
    const isMobile = window.innerWidth <= 640;
    const isTablet = !isMobile && window.innerWidth <= 800;
    const isDesktop = !isMobile && !isTablet;

    if (getTipoFlujo() !== 3) {
        const windowInfo = Utils.datosMaquina(window);
        gatewayService.validateUser(
            localStorage.getItem('correo'),
            '',
            userIp,
            windowInfo.browser,
            '',
            windowInfo.os,
            isMobile,
            isTablet,
            isDesktop,
            hasCamera,
            false,
            false,
            3
        ).then((respuesta) => {
            if (respuesta.statusCode == 200 || respuesta.statusCode == 201 || respuesta.statusCode == 204) {
                if (respuesta.data.nextStep.process == 'OTP') {
                    document.getElementById("load-banner").style.display = "none";
                    const modal = document.getElementById("otp-modal");
                    const form = document.getElementById("otp-form");
                    document.getElementById("phoneUs").innerHTML = phoneNumber;
                    modal.style.display = "flex";
                    form.addEventListener("submit", e => {
                        e.preventDefault();
                        const pin = document.getElementById("opt-input").value; 
                        requestOTP(respuesta.data.authId, pin).then(() => {
                            setUpConfigure(pin);
                        });
                    });
                } else if (respuesta.data.nextStep.process == 'Firma') {
                    setUpConfigure();
                    // uploadDoc()
                }
            } else {
                // router.navigateByUrl('main/errorMifirma', { skipLocationChange: true });
            }
        });
    } else {
        setUpConfigure();
        // uploadDoc()
    }
}

function requestOTP(authId, PIN) {
    if (/[0-9]{6}/g.test(PIN)) {
        const modal = document.getElementById("otp-modal");
        return gatewayService.validate(authId, PIN).then((res) => {
            if (res.statusCode === 200 && res.data.hit) {
                modal.style.display = "none";
                //TODO: Show ending screen
            } else if (res.statusCode == 403) {
                new attention.Alert({
                    title: 'Superó el máximo de intentos de autenticación',
                    content: 'Su usuario ha sido bloqueado por medidas de seguridad'
                });
                //alert(', su usuario ha sido bloqueado por medidas de seguridad');
                sessionService.logout();
                window.location.href = 'https://localhost'
            } else if (res.statusCode == 505) {
                new attention.Alert({
                    title: 'No pudimos validar el código OTP',
                    content: 'Por favor intente de nuevo'
                });
                clearOTPForm();
            } else {
                new attention.Alert({
                    title: 'No pudimos validar el código OTP',
                    content: 'PIN incorrecto!'
                });
                alert('PIN incorrecto!');
                clearOTPForm();
            }
        }).catch(response => {
            if (response.error && response.error.statusCode === 401 ) {
                sessiOTPonService.logout();
            } else if (response.error && response.error.statusCode == 403) {
                new attention.Alert({
                    title: 'Superó el máximo de intentos de autenticación',
                    content: 'Su usuario ha sido bloqueado por medidas de seguridad'
                });
                routeOTPr.navigateByUrl('');
                sessiOTPonService.logout();
            } else if (response.error && response.error.statusCode == 505) {
                new attention.Alert({
                    title: 'No pudimos validar el código OTP',
                    content: 'Por favor intente de nuevo'
                });
                clearOTPForm();
            } else {
                document.getElementById("opt-error").innerText = "Código incorrecto, digítalo nuevamente.";
                document.getElementById("opt-error").style.display = "flex";
                clearOTPForm();
            }
        });
    }
}

function clearOTPForm() {
    document.getElementById("opt-input").value = "";
}

/**
 * Returns a list of recipients
 * list is just a strong-typed list of every signer
 */
function getDestinatarios() {
    const destinatarios = [];

    for (const firmante of signers) {
        destinatarios.push(new Destinatario(firmante.nombre, firmante.correo));
    }
    return destinatarios;
}


/**
 * Returns a list of signatures
 * list is just a strong-typed list of every signature
 */
 async function getFirmas() {

    const { annotManager, docViewer } = wvInstance;
    const doc = docViewer.getDocument();
    const firmas = [];
    let type ="";
    let fi = 0;
    while ( fi < signers.length) {

        const annotations = [];
        const PageNumber = 1;
        annotManager.getAnnotationsList().filter(annot => {
            const fromMiFirma = annot.getCustomData('MiFirma');
            return fromMiFirma && signers[fi].tipo == annot.CustomData.rol;
        }).forEach( (annot) => {
            contador++;
            console.log('NRO ANOTACION: ');
            console.log(contador);
            
            type = annot.getCustomData('type');
            console.log('Tipo Annot:');
            console.log(type);

            if (type === AnnotationType.SIGNATURE) {
                const pdfCoords = doc.getPDFCoordinates(annot.getPageNumber(), annot.getX(), annot.getY());

                let X1 = Math.round(pdfCoords.x);
                let Y1 = Math.round(pdfCoords.y);
                let Height = Math.round(annot.getHeight());
                let Width = Math.round(annot.getWidth());
                PageNumber = Math.round(annot.getPageNumber());

                firmas[fi] = new Firma(fi + 1, fi + 1, false, false, '', 2, signers[fi].nombre,
                    signers[fi].correo, 0, X1, Y1 - Height, Height, Width, PageNumber - 1, true);
                
                console.log(`Firma indiv ${fi}`);
                console.log(firmas[fi]);
                
                fi++;
            } else {
                console.log('Por el camino viejo');
                annotations.push(annot);
            }
        }
        
        );
        console.log('Fi: ');
        console.log(fi);
        if (signers[fi-1].tipo !== 'Yo') { //otros firmantes 
            let annotationsXFDF = await annotManager.exportAnnotations({ annotList: annotations });
            firmas[fi-1].signatureAnnotations = annotationsXFDF;
            firmas[fi-2].signatureAnnotations = annotationsXFDF;
            //console.log('Las firmas:');
            //console.log(firmas);
        }

    }
    return firmas;
}

/**
 * Configures the document so that it can later be signed
 * @param pin The OTP which was used for authentication
 */
async function setUpConfigure(pin) {
    document.getElementById("load-banner").style.display = "block";
    const pdfOriBase64 = localStorage.getItem("word-document1");
    console.log('Inicio proceso');
    const firmas = await getFirmas();
    console.log('Fin proceso. FIRMAS:');
    console.log(firmas);
    firmadorService.ConfigurarFirma(pdfOriBase64,
        getTipoFlujo(),
        `${localStorage.getItem("word-document-name1")}-${Date.now()}.pdf`,
        getDestinatarios(),
        firmas)
        .then((Respuesta) => {
            console.log('Firmando...');
            console.log(Respuesta.message);
            if (
                Respuesta.message === 'Petición exitosa' &&
                Respuesta.data &&
                Respuesta.data.signatures
            ) {
                let guidFirma;

                for (const firma of Respuesta.data.signatures) {
                    // 1 es el id del firmante principal
                    if (firma.id === 1) {
                        guidFirma = firma.signatureGuid;
                        break;
                    }
                }
                //if (getTipoFlujo() !== 3) {
                    console.log("Firmando con: ");
                    console.log(Respuesta.data.documentSerial);
                    console.log("Y PIN: ");
                    console.log(pin);
                    firmarDocumentos(guidFirma, Respuesta.data.documentSerial, pin);
                //} else {
                //    startOver();
                    console.log('Proceso Exitoso: firmarDocumentos');
                    document.getElementById("load-banner").style.display = "none";
                    document.getElementById('success').style.display = 'flex';
                //}
            } else if (Respuesta.status_code === 401) {
                sessionService.logout();
            } else {
                console.log("ERROR! ");
                console.log(Respuesta);
                // router.navigateByUrl('main/errorMifirma', { skipLocationChange: true });
            }
        });
}

async function uploadDoc(pin) {
    const pdfOriBase64 = Utils.Uint8ArrayToStringBase64(file);
    firmadorService.uploadDoc(files[0].name, pdfOriBase64).subscribe((respuesta) => {
        if (respuesta.statusCode == 200 || respuesta.statusCode == 201) {
            setUpConfigure2(respuesta.data.documentId, pin);
        } else if (respuesta.statusCode == 401) {
            sessionService.logout();
        } else if (respuesta.statusCode == 204) {
            console.log('Este documento ya existe, por favor cambie el nombre del documento');
            // router.navigateByUrl('main/documentos');
        } else {
            // router.navigateByUrl('main/errorMifirma', { skipLocationChange: true });
        }
    });
}

function getGuidFirma(info, pin) {
    firmadorService.getToSign(info).subscribe((respuesta) => {
        if (respuesta.statusCode == 200 || respuesta.statusCode == 201) {
            if (getTipoFlujo() !== 3) {
                firmarDocumentos(respuesta.data.guidFirma, respuesta.data.documentSerial, pin);
            } else {
                startOver();
                toast.success('Proceso Exitoso3!');
            }
        } else if (respuesta.statusCode == 401) {
            sessionService.logout();
        } else {
            // router.navigateByUrl('main/errorMifirma', { skipLocationChange: true });
        }
    });
}

async function setUpConfigure2(id, pin) {

    const firmas = await getFirmas();

    firmadorService.ConfigurarFirma2(id,
        getDestinatarios(),
        firmas)
        .subscribe((Respuesta) => {
            if (Respuesta.statusCode == 200 || Respuesta.statusCode == 201) {
                getGuidFirma(Respuesta.data.processId, pin);
            } else if (Respuesta.statusCode == 401) {
                sessionService.logout();
            } else {
                // router.navigateByUrl('main/errorMifirma', { skipLocationChange: true });
            }
        });
}

/**
 * Returns an encoded stamp image
 * @param pin The OTP which was used for authentication
 */
async function getESignatureStamp(pin, guidFirma) {
    const fontOtherSigners = '/assets/open-sans-16-black.txt';
    const selloPathBase = '/assets/img-esign4x.png';
    const date = new Date();
    //let aditionalData = pin ? `OTP: ${pin} - ` : '';
    //aditionalData += `Fecha: ${date.toLocaleDateString('es-CO')} - Hora: ${date.toLocaleTimeString('es-CO', { hour12: false })}`;
    let aditionalData = pin ? `ID Firma: ${guidFirma}` : 'NO VALID PIN';
    const sello = await Jimp.read(selloPathBase);
    const image = new Jimp(stampWidth, stampHeight);

    image.opacity(0.3);
    const font = await Jimp.loadFont(fontOtherSigners);
    image.print(
        font, 0, 0,
        {
            text: aditionalData,
            alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
            alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
        },
        image.bitmap.width,
        image.bitmap.height
    );

    sello.composite(image, 0, 0);
    let thisResponse;
    thisResponse = await sello.getBase64Async(Jimp.MIME_PNG);
    console.log(thisResponse);
    return thisResponse;
}

/**
 * Returns a stamp annotation whose image data is a stamp
 * @param pin The OTP which was used for authentication
 */
async function getStampAnnotation(pin, guidFirma) {
    const { Annotations } = wvInstance;
    const annotation = new Annotations.StampAnnotation();
    const dims = new Dimension(signingData.width, signingData.height);

    const stampDims = new Dimension(dims.width, stampHeight * (dims.width / stampWidth));
    const stamp = await getESignatureStamp(pin, guidFirma);

    annotation.PageNumber = signingData.pageNumber;
    annotation.X = signingData.x - (dims.width * 0.08);

    annotation.Y = signingData.y + (dims.height - stampDims.height);
    annotation.Width = stampDims.width;
    annotation.Height = stampDims.height;
    annotation.NoMove = true;
    annotation.NoResize = true;
    annotation.NoRotate = true;
    annotation.ImageData = stamp;

    return annotation;
}

/**
 * Signs the document
 * flattens the user annotations on the client side
 * @param guidFirma The signature identifier for signer
 * @param serialDoc The document identifier
 * @param pin The OTP which was used for authentication
 */
async function firmarDocumentos(guidFirma, serialDoc, pin) {
    const { annotManager, docViewer } = wvInstance;
    const doc = docViewer.getDocument();

    const annots = annotManager.getAnnotationsList().filter((annot) => {
        const fromMiFirma = annot.getCustomData('MiFirma');
        const rol = annot.getCustomData('rol');
        return !fromMiFirma || rol === 'Yo';
    });

    const stampAnnotation = await getStampAnnotation(pin, guidFirma);

    const xfdfString = await annotManager.exportAnnotations({
        annotList: [...annots, stampAnnotation],
        widgets: true,
        links: true,
        fields: true
    });

    const options = { xfdfString, flatten: true };
    const data = await doc.getFileData(options);
    const arr = new Uint8Array(data);

    firmadorService.EjecutarFirma(guidFirma,
        localStorage.getItem('personaNombre'),
        signingData.signatureGUID,
        Utils.Uint8ArrayToStringBase64(arr),
        serialDoc
    ).then((Respuesta) => {
        console.log('then:');
        console.log(Respuesta);
        console.log('then1:');
        console.log(Respuesta.message);
        if (
            //Respuesta.message === 'Petición exitosa' &&
            Respuesta.statusText === 'OK' &&
            Respuesta.status === 200
        ) {
            console.log('Proceso Exitoso: EjecutarFirma');

            //paramService.googleAnalytics.subscribe((enabled) => {
            //    if (enabled) {
             //       window.dataLayer.push({
              //          event: 'firmaejecutada',
            //            tipoCliente: Respuesta.data.customerClasification,
            //        });
            //    }
            //    startOver();
            //});
            console.log('Process ended succesfully. Starting over');
            startOver();
        } else if (Respuesta.status_code === 401) {
            console.log|('401 Error!');
            sessionService.logout();
        } else if (Respuesta.status_code === 404) {
            console.log|('404 Error in Back!');
        } else {
            console.log(Respuesta.status_code);
            console.log('No se pudo ejecutar la firma!');
            console.log(Respuesta.message);
            // router.navigateByUrl('main/agregarfirmantes');
        }
    });
}

/**
 * Starts a new process if there are pending documents to be signed.
 * Otherwise, it redirects the user to the list of documents
 */
function startOver() {
    files.splice(0, 1);

    if (files.length === 0) {
        // router.navigateByUrl('main/repositorio');
    } else {
        // router.navigateByUrl('main/agregarfirmantes');
    }
}

/**
 * Returns a number which represents the type of flow which is getting processed
 * Only me => 1
 * Me and others => 2
 * Others => 3
 */
function getTipoFlujo() {
    store.dispatch('setSigners',  signers );
    const me = signers.find(signer => signer.tipo === 'Yo');
    const flowType = (me && signers.length === 1) ? 1 : me ? 2 : 3;
    //console.log(store.state.signers);
    console.log("Flowtype: ");
    console.log(flowType);
    document.getElementById("document-tipoFlujo").innerHTML = flowType;
    return flowType;
}


function addJSToSigns (){

    var elements = document.getElementsByClassName("option");
 
     var lightBackColor = function() {
         this.style.background='#eeeeee';
     };
     
     var darkBackColor = function() {
         this.style.background='#ffffff';
     };
     
     for (var i = 0; i < elements.length; i++) {
         elements[i].addEventListener('mousemove', lightBackColor, false);
         elements[i].addEventListener('mouseleave', darkBackColor, false);
     }

     for (var i=0; i<signatures.length; i++) {
        document.getElementById('f_' + i).src= signatures[i].archivo;
     }
 }

 function addJSToRads(){
    if (document.querySelector('input[name="firma"]')) {
        document.querySelectorAll('input[name="firma"]').forEach((elem) => {
          elem.addEventListener("change", function(e) {
              console.log(e.target.value);
                onSignatureUriChange(signatures[e.target.value].archivo)
                onSignatureGuidChange(signatures[e.target.value].guid)
          });
        });
      }
 }



//MAIN START: STORE
//import store from './store/index.js'; 

// Load up components
import SignerSelect from './components/signerSelect.js';
import Count from './components/count.js';
import List from './components/list.js';
import Status from './components/status.js';

// Load up some DOM elements
const formElement = document.querySelector('.js-form');
const inputElement = document.querySelector('#new-item-field');
const correoElement = document.querySelector('#new-email-field');

// Add a submit event listener to the form and prevent it from posting back
formElement.addEventListener('submit', evt => {
    evt.preventDefault();
    
    // Grab the text value of the textbox and trim any whitespace off it
    let nameValue = inputElement.value.trim();
    let emailValue = correoElement.value.trim();
    
    // If there's some content, trigger the action and clear the field, ready for the next item
    //if(nameValue.length && emailValue.length) {
    if(true) {
        store.dispatch('addItem', [nameValue, emailValue]);
        inputElement.value = '';
        correoElement.value = '';
        inputElement.focus();
    }
});

// Instantiate components
const countInstance = new Count();
const listInstance = new List();
const statusInstance = new Status();
const signerSelectInstance = new SignerSelect();

// Initial renders
countInstance.render();
listInstance.render();
statusInstance.render();
signerSelectInstance.render();

//front JS
document.getElementById("other-signers").onsubmit = prepareSigners;

function prepareSigners(event) {
    event.preventDefault();
    if(store.state.tipoFlujo == 1){
        setTipoFlujo();
    } 
    else if(store.state.tipoFlujo == 2)
    {
        var tF = getTipoFlujo();
        if(tF == 2){
            setTipoFlujo();
        } else {
            addSignersToStore();
            tF = getTipoFlujo();
            if(tF == 2){
                setTipoFlujo();
            } else {
                console.log("Incomplete 2");
                console.log(tF);
            }            
        }
       
        //event.currentTarget.submit();
    }
    else if(store.state.tipoFlujo == 3)
    {
        removeMeFromSigners();
        var tF = getTipoFlujo();
        if(tF == 3){
            addSignersToStore();
            setTipoFlujo();
        } else {
            console.log("Incomplete 3");
        }
        
    }
    else {
        store.dispatch('setFlowType', 1);
        setTipoFlujo();
    }
}

//testAddSigner
function addSignersToStore() {
    var element = {};
    store.state.items.map((item, index) => {
        element.tipo = "Otros";
        element.nombre = `${item[0]}`; 
        element.correo = `${item[1]}`;       
        element.annotations = [];
        signers.push(element);
        element = {};
    });
    store.dispatch('setSigners',  signers );
    chooseSigner(0);
    console.log(signers);
}

function removeMeFromSigners(){
    signers.splice(0, 1);
    store.dispatch('setSigners',  signers );
}

function switchOrder(){
    store.dispatch('setSignersOrder',  document.getElementById("sign-order").checked);
    var x = document.getElementsByClassName("MF-toggle");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].classList.toggle("active");
    }
    //console.log(document.getElementById("sign-order").checked);
    //store.dispatch('setSigners',  signers );
}

function signOrder() {
    //console.log(store.state);
    console.log(signers);
}


//document.getElementById('sign-order').addEventListener("click", () => getTipoFlujo());
document.getElementById('sign-order').addEventListener("change", () => switchOrder());
document.getElementById('select-sign-order').addEventListener("click", () => signOrder());

document.getElementById('side-menu').addEventListener("click", () => openNav());
document.getElementById('topnav').addEventListener("click", () => closeAllAlerts());
document.getElementById('overlay').addEventListener("click", () => closeNav());
document.getElementById('personal-folder').addEventListener("click", () => openPersonalFolder());
document.getElementById('customize-signature').addEventListener("click", () => openEditSignature());
document.getElementById('user-options').addEventListener("click", () => toggleMenu());
document.getElementById('user-alerts').addEventListener("click", () => toggleAlert());

document.getElementById('app-profile').addEventListener("click", () => openProfile());
document.getElementById('app-config').addEventListener("click", () => openConfig());
document.getElementById('app-terms').addEventListener("click", () => openTerms());
document.getElementById('app-policy').addEventListener("click", () => openPolicy());
document.getElementById('app-logout').addEventListener("click", () => logOut());

document.getElementById('finished-next-step').addEventListener("click", () => openPersonalFolder());

document.getElementById('onlyMe').addEventListener("click", () => {
    document.getElementById('other-signers').setAttribute('novalidate', true);
    var flow_type = 1;
    store.dispatch('setFlowType', 1);
    hideSigners();
});

document.getElementById('othersAndMe').addEventListener("click", () => {
    document.getElementById('other-signers').removeAttribute('novalidate');
    var flow_type = 2;
    store.dispatch('setFlowType', 2);
    showSigners();
});

document.getElementById('others').addEventListener("click", () => {
    document.getElementById('other-signers').removeAttribute('novalidate');
    var flow_type = 3;
    store.dispatch('setFlowType', 3);
    showSigners();
});

async function showSigners() {
document.getElementById("signerData").style.display = "block";
}
async function hideSigners() {
document.getElementById("signerData").style.display = "none";
}
toggleAlert();
toggleMenu();

$(document).ready(function () {
    //highlight selected signatory flow
    $(".MF-third").click(function () {
        $(".MF-third").removeClass("MF-selected");
        $(".MF-image-on").addClass("MF-hidden");
        $(".MF-image-off").removeClass("MF-hidden");

        $(this).addClass("MF-selected");
        $(this).children(".MF-image-on").removeClass("MF-hidden");
        $(this).children(".MF-image-off").addClass("MF-hidden");
        //console.log(tipoFlujo);
    });
 });

document.addEventListener("mousedown", function () {
    var list = $('#sortSigner'),
      updatePosition = function(event, ui) {
        var fromIndex = ui.item.data('start_pos');
        var toIndex = ui.item.index();
        //alert(fromIndex + ' - ' + toIndex);
        store.dispatch('moveItem', { fromIndex, toIndex });
        //console.log(store.state.items);
        list.children().each(function(i, e){
          $(this).children('input[type="hidden"]').val(++i);
        });
      };

    list.sortable({
        start: function(event, ui) {
            var fromIndex = ui.item.index();
            ui.item.data('start_pos', fromIndex);
        },
        placeholder: "ui-state-highlight",
        update: updatePosition
  });
 });

 function cargarFirmantes (){
    document.getElementById('start').style.display = 'flex';
 }

 function setTipoFlujo(){
    //document.getElementById("chosen-flujo").innerHTML = store.state.tipoFlujo;
    var selector = document.getElementById('signer-item');
    selector.addEventListener("change", function() {
        chooseSigner(selector.options[selector.selectedIndex].value - 1);
        
    });
    document.getElementById('start').style.display = 'none';
 }

 function openNav() {
  document.getElementById("MFSidepanel").style.width = "400px";
  document.getElementById("overlay").style.display = "block";
  closeAlert();
  closeMenu();
}
function openAlert() {
    document.getElementById("MFSidealerts").style.width = "300px";
    closeMenu();
}

function openMenu() {
    document.getElementById("MFUsermenu").style.display = 'block';
}

function closeMenu() {
    document.getElementById("MFUsermenu").style.display = 'none';
}

function toggleMenu() {
    var elem = document.getElementById("MFUsermenu");
    if(elem.style.display == 'none') {
        openMenu();
    } else {
        closeMenu();
    }
}

function closeNav() {
  document.getElementById("MFSidepanel").style.width = "0";
  document.getElementById("overlay").style.display = "none";
  closeAlert();
}

function closeAlert(){
    document.getElementById("MFSidealerts").style.width = "0";
}

function closeAllAlerts() {
    if(false){
        closeNav();
        closeAlert();
        closeMenu();
    }
}

function toggleAlert() {
    var elem = document.getElementById("MFSidealerts");
    //console.log(elem.style.width);
    if (elem.style.width !== "0px") {
        closeAlert();
    }
    else {
        openAlert();
    }
}

function logOut() {
    sessionStorage.clear();
    //window.localStorage.clear();

    window.location = "https://localhost:2000/app.html";
}

function openPersonalFolder() {
    window.location = ('https://olsrvpruwtce01:6242/dist/main/repositorio');
}

function openEditSignature() {
    window.location = ('https://olsrvpruwtce01:6242/dist/main/miFirma');
}

function openTerms() {
    window.location ='https://olsrvpruwtce01:6242/dist/main/terminos/terminos-condiciones';
}

function openPolicy() {
    window.location = 'https://olsrvpruwtce01:6242/dist/main/terminos/tratamiento-datos';
}

function openConfig() {
    window.location = 'https://olsrvpruwtce01:6242/dist/main/configuracion'
}

function openProfile() {
    window.location = 'https://olsrvpruwtce01:6242/dist/main/perfil';
}

// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area");


function handleFiles() {
    let files = this.files;
    files = [...files];
    files.forEach(uploadFile);
    files.forEach(previewFile);
  }

  function handleDroppedFiles(someFiles) {
    let files = someFiles;
        
    files = [...files];
    files.forEach(uploadFile);
    files.forEach(previewFile);
  }

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);   
  document.body.addEventListener(eventName, preventDefaults, false);
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  dropArea.classList.add('highlight');
}

function unhighlight(e) {
  dropArea.classList.remove('active');
}

function handleDrop(e) {
  var dt = e.dataTransfer;
  var files = dt.files;

  handleDroppedFiles(files);
}

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement('img');
    img.src = reader.result;
    document.getElementById('gallery').appendChild(img);
  }
  document.getElementById('drop-area').style.backgroundImage = 'none';
}

function uploadFile(file, i) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      const base64 = reader.result;
      const n = base64.indexOf("base64") + 7;
      const nbase64 = base64.slice(n);
      var str = file.name;
      var s = str.lastIndexOf(".") + 1;
      var fileExt = str.slice(s);
      document.getElementById("load-banner").style.display ="block";
      console.log('started adding signature graph');
        //console.log(base64);
        gatewayService.uploadSignature(
            nbase64, 
            file.name, 
            fileExt
            ).then((Respuesta) => {
            console.log('finished adding signature graph');
            console.log(Respuesta);
            if(Respuesta.status_code == 200) {
                document.getElementById("load-banner").style.display ='none';
            }
        });
    }
     
}


/**Functions for drawing text signature */
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

const erase1 = document.getElementById('erase');
const canvas1 = document.getElementById("my-Canvas");
const ctx1 = canvas1.getContext("2d");
const download = document.getElementById('download');
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "60px 'Great Vibes'";

var inputtext = document.getElementById('signature-text');

inputtext.addEventListener('keyup', () =>{
	var texto=inputtext.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(texto,20,100);
    
});

erase1.addEventListener('click', () =>{
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
});

download.addEventListener('click', function(e) {
  console.log(canvas.toDataURL());
  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
});

// last known position
var pos = { x: 0, y: 0 };

function setPosition(e) {
  pos.x = e.clientX-430;
  pos.y = e.clientY-280;
}

function draw(e) {
  // mouse left button must be pressed
  if (e.buttons !== 1) return;

  ctx1.beginPath(); // begin

  ctx1.lineWidth = 2;
  ctx1.lineCap = 'round';
  ctx1.strokeStyle = '#000';

  ctx1.moveTo(pos.x, pos.y); // from
  setPosition(e);
  ctx1.lineTo(pos.x, pos.y); // to

  ctx1.stroke(); // draw it!
}
