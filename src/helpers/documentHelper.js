/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global Excel, Office, OfficeExtension, Word */

export function writeDataToOfficeDocument(result) {
  return new Promise(function(resolve, reject) {
    try {
      switch (Office.context.host) {
        case Office.HostType.Excel:
          writeDataToExcel(result);
          break;
        case Office.HostType.Outlook:
          writeDataToOutlook(result);
          break;
        case Office.HostType.PowerPoint:
          writeDataToPowerPoint(result);
          break;
        case Office.HostType.Word:
          writeDataToWord(result);
          break;
        default:
          throw "Unsupported Office host application: This add-in only runs on Excel, Outlook, PowerPoint, or Word.";
      }
      resolve();
    } catch (error) {
      reject(Error("Unable to write data to document. " + error.toString()));
    }
  });
}

function filterUserProfileInfo(result) {
  let userProfileInfo = [];
  var fullName = result["displayName"];
  var firstName = fullName.split(' ').slice(0, -2).join(' ');
  var lastName = fullName.split(' ').slice(-2).join(' ');
  var fullcustomerMobile = result["mobilePhone"];
  var customerMobile;
  var ind = null;

  userProfileInfo.push(fullName);
  userProfileInfo.push(result["jobTitle"]);
  userProfileInfo.push(result["mail"]);
  userProfileInfo.push(fullcustomerMobile);
  userProfileInfo.push(result["officeLocation"]);
    
  if (fullcustomerMobile.length > 10) {
  ind = fullcustomerMobile.substring(0, fullcustomerMobile.length - 10);
  customerMobile = fullcustomerMobile.substring(fullcustomerMobile.length - 10, fullcustomerMobile.length);
  } else {
  	customerMobile = fullcustomerMobile;
  }

  localStorage.setItem('firstName', firstName); //
  localStorage.setItem('lastName', lastName);
  localStorage.setItem('user', result["mail"]); //correo
  localStorage.setItem('customerMobile', customerMobile);
  if(ind !== null) {
    localStorage.setItem('ind', ind);
  }
  return userProfileInfo;
}

function writeDataToExcel(result) {
  return Excel.run(function(context) {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    let data = [];
    let userProfileInfo = filterUserProfileInfo(result);

    for (let i = 0; i < userProfileInfo.length; i++) {
      if (userProfileInfo[i] !== null) {
        let innerArray = [];
        innerArray.push(userProfileInfo[i]);
        data.push(innerArray);
      }
    }
    const rangeAddress = `B5:B${5 + (data.length - 1)}`;
    const range = sheet.getRange(rangeAddress);
    range.values = data;
    range.format.autofitColumns();

    return context.sync();
  });
}

function writeDataToOutlook(result) {
  let data = [];
  let userProfileInfo = filterUserProfileInfo(result);

  for (let i = 0; i < userProfileInfo.length; i++) {
    if (userProfileInfo[i] !== null) {
      data.push(userProfileInfo[i]);
    }
  }

  let userInfo = "";
  for (let i = 0; i < data.length; i++) {
    userInfo += data[i] + "\n";
  }

  Office.context.mailbox.item.body.setSelectedDataAsync(userInfo, { coercionType: Office.CoercionType.Html });
}

function writeDataToPowerPoint(result) {
  let data = [];
  let userProfileInfo = filterUserProfileInfo(result);

  for (let i = 0; i < userProfileInfo.length; i++) {
    if (userProfileInfo[i] !== null) {
      data.push(userProfileInfo[i]);
    }
  }

  let userInfo = "";
  for (let i = 0; i < data.length; i++) {
    userInfo += data[i] + "\n";
  }
  Office.context.document.setSelectedDataAsync(userInfo, function(asyncResult) {
    if (asyncResult.status === Office.AsyncResultStatus.Failed) {
      throw asyncResult.error.message;
    }
  });
}

function writeDataToWord(result) {
  return Word.run(function(context) {
    let data = [];
    let userProfileInfo = filterUserProfileInfo(result);
    //console.log('Raw Data:');
    //console.log(userProfileInfo);
    for (let i = 0; i < userProfileInfo.length; i++) {
      if (userProfileInfo[i] !== null) {
        data.push(userProfileInfo[i]);
      }
    }
    //console.log("User data from Office:");
    //console.log(data);
    const documentBody = context.document.body;
    for (let i = 0; i < data.length; i++) {
      if (data[i] !== null) {
        //documentBody.insertParagraph(data[i], "End");
      }
    }
    /*var authContext = new AuthenticationContext(config);
    authContext.acquireToken("https://graph.microsoft.com", function (error, token) {
        var request = new XMLHttpRequest;
        request.open("GET", "https://graph.microsoft.com/beta/me/Photos/48X48/$value");
        request.setRequestHeader("Authorization", "Bearer " + token);
        request.responseType = "blob";
        request.onload = function () {
            if (request.readyState === 4 && request.status === 200) {
                var imageElm = document.createElement("img");
                var reader = new FileReader();
                reader.onload = function () {
                    // Add the base64 image to the src attribute
                    imageElm.src = reader.result;
                    // Display the user's profile picture
                    document.getElementsByClassName('user-picture-box')[0].appendChild(imageElm);
                }
                reader.readAsDataURL(request.response);
            }
        };
        request.send(null);
    });*/
    localStorage.setItem('noob', '1');
    localStorage.setItem('authId', '0');
    localStorage.setItem('userFromOffice', true);
    openMiFirma();
    return context.sync();
  });
}

export async function openMiFirma() {
  return Word.run(async context => {
    Office.context.ui.displayDialogAsync("https://mifirma.centralus.cloudapp.azure.com/app.html", { width:30, height:75 });   

   //  if (localStorage.getItem("word-document1") === null) {
      var documentName = "empty";
      if(Office.context.document.url != null){
        var url = Office.context.document.url;
        documentName =  url.substring(url.lastIndexOf('/') + 1);
      }
      
      Office.context.document.getFileAsync(Office.FileType.Pdf, {sliceSize:4194304}, (result) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          const file = result.value;
          file.getSliceAsync(0, (result) => {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
              const { data } = result.value;
              console.log('DATA: ');
              console.log(data);
              if (data) {
                const buff = Buffer.from(data, 'utf-8');
                const base64 = buff.toString('base64');
                console.log('base64: ');
                console.log(base64);
                localStorage.setItem('word-document1', base64);
                localStorage.setItem('word-document-name1', documentName);
                console.log("Word to PDF y guardado en LocalStorage:");
                console.log(localStorage.getItem('word-document-name1'));
                console.log(localStorage.getItem('word-document1'));
                //console.log(Office.context.document.Name);
              }
            }
            file.closeAsync(result => {
              console.log(result.status);
            });
          });
        } else
        {
          console.log("Error al cargar pdf ")
        }
      });
    //}//

    await context.sync();
  });
}
