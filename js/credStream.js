async function regStream(data) {
    console.log("Intiated data send")
    let currDate = new Date().toISOString();
    var pid="P"+Math.round((1+Math.random())*10000);
    var json = {
      header: {
        schemaRef: {
          id: "https://ns.adobe.com/cognizanttechnologys/schemas/dd705cd70679369bebed279bbe0545a3219873914b0bfedb",
          contentType: "application/vnd.adobe.xed-full+json;version=1.0",
        },
        imsOrgId: "D1D7123F524450A60A490D45@AdobeOrg",
        datasetId: "65a0d41e1729e42c9f63e644",
        source: {
          name: "Vaahan Profile DS",
        },
      },
      body: {
        xdmMeta: {
          schemaRef: {
            id: "https://ns.adobe.com/cognizanttechnologys/schemas/dd705cd70679369bebed279bbe0545a3219873914b0bfedb",
            contentType: "application/vnd.adobe.xed-full+json;version=1.0",
          },
        },
        xdmEntity: {
          _cognizanttechnologys: {
            addressMeta: {
              city: data.city,
              country: data.country,
              email: data.email,
              phone: data.mobile,
              province: data.state,
            },
            cryptInfo: { passwordEnc: data.passwordEnc },
            mktAttr: { cusType: data.cusType, personId: pid },
            nameMeta: {
              firstName: data.firstName,
              lastName: data.lastName,
              salutation: data.salutation,
            },
          },
          _id: "/uri-reference",
          _repo: {
            createDate:currDate,
            modifyDate: currDate,
          },
          createdByBatchID: "/uri-reference",
          modifiedByBatchID: "/uri-reference",
          personID: "Sample value",
          repositoryCreatedBy: "Sample value",
          repositoryLastModifiedBy: "Sample value",
        },
      },
    };
  
    console.log(json.body.xdmEntity._cognizanttechnologys);
  
    json = JSON.stringify(json);
  
    //   var xhttp = new XMLHttpRequest();
    //   xhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //       console.log(">>>>> Profile call sent to " + tenantId + ".");
    //       console.log(xhttp.responseText);
    //     }
    //   };
    //   xhttp.open("POST", url, true);
    //   xhttp.setRequestHeader("Content-type", "application/json");
    //   xhttp.send(JSON.stringify(json));
    let res = await fetch(
      "https://dcs.adobedc.net/collection/27d8ff5018d45356ecfc57b604131a43646d868ed32a32cc1451d272847035de",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: json,
      }
    );
    console.log(await res.json());
  }