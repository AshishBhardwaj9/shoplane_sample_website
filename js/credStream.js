async function regStream(data) {
  console.log("Intiated data send");
  console.log("ECID " + _satellite.getVar("ECID"));
  var ecid = _satellite.getVar("ECID");
  let currDate = new Date().toISOString();
  let currSpDate = currDate.toString().split("T")[0];
  var pid = "P" + Math.round((1 + Math.random()) * 10000);
  var yob = Number(data.dob.split("-")[0]);
  var json = {
    header: {
      schemaRef: {
        id: "https://ns.adobe.com/dentsuglobalpartnersbx/schemas/9272269cf7f0f17d37c71b05e57da5991a2eac9cf160c5ab",
        contentType: "application/vnd.adobe.xed-full+json;version=1.0",
      },
      imsOrgId: "DB5448F45E66075A0A495CCA@AdobeOrg",
      datasetId: "678c0453a2e5ed2aee14b72d",
      source: {
        name: "Eagora profile Streaming dataflow ",
      },
    },
    body: {
      xdmMeta: {
        schemaRef: {
          id: "https://ns.adobe.com/dentsuglobalpartnersbx/schemas/9272269cf7f0f17d37c71b05e57da5991a2eac9cf160c5ab",
          contentType: "application/vnd.adobe.xed-full+json;version=1.0",
        },
      },
      xdmEntity: {
        _dentsuglobalpartnersbx: {
          eagoraProfileIdentity: {
            uid: pid,
            ecid: ecid,
            email: data.email,
            phone: data.phone,
          },
        },
        _id: "/uri-reference",
        _repo: {
          createDate: currDate,
          modifyDate: currDate,
        },
        consents: {
          collect: {
            val: "y",
          },
          idSpecific: {
            key: {
              key: {
                adID: {
                  idType: "IDFA",
                  val: "y",
                },
                collect: {
                  val: "y",
                },
                marketing: {
                  email: {
                    time: currDate,
                    val: "y",
                  },
                  push: {
                    time: currDate,
                    val: "y",
                  },
                  sms: {
                    time: currDate,
                    val: "y",
                  },
                },
                personalize: {
                  content: {
                    val: "y",
                  },
                },
                share: {
                  val: "y",
                },
              },
            },
          },
          marketing: {
            any: {
              time: currDate,
              val: "y",
            },
            call: {
              time: currDate,
              val: "y",
            },
            commercialEmail: {
              time: currDate,
              val: "y",
            },
            fax: {
              time: currDate,
              val: "y",
            },
            postalMail: {
              time: currDate,
              val: "y",
            },
            preferred: "email",
          },
          metadata: {
            time: "2018-11-12T20:20:39+00:00",
          },
          personalize: {
            content: {
              val: "y",
            },
          },
          share: {
            val: "y",
          },
        },
        createdByBatchID: "/uri-reference",
        modifiedByBatchID: "/uri-reference",
        person: {
          birthDate: data.dob,
          birthYear: yob,
          gender: data.gender,
          name: {
            courtesyTitle: data.salutation,
            firstName: data.fname,
            lastName: data.lname,
          },
          nationality: "IN",
        },
        userAccount: {
          accountType: data.cusType,
          alertStatus: false,
          autopayStatus: false,
          contactDetails: {
            billingAddress: {
              _id: "/uri-reference",
              _repo: {
                createDate: currDate,
                modifyDate: currDate,
              },
              city: data.city,
              country: "INDIA",
              countryCode: "IN",
              createdByBatchID: "/uri-reference",
              lastVerifiedDate: currSpDate,
              modifiedByBatchID: "/uri-reference",
            },
            billingAddressPhone: {
              countryCode: "91",
              number: data.phone,
              primary: true,
              status: "active",
              validity: "consistent",
            },
            homeAddress: {
              _id: "/uri-reference",
              _repo: {
                createDate: currDate,
                modifyDate: currDate,
              },
              city: data.city,
              country: data.country,
              countryCode: "IN",
              createdByBatchID: "/uri-reference",
              lastVerifiedDate: currSpDate,
              modifiedByBatchID: "/uri-reference",
            },
            homePhone: {
              countryCode: "91",
              number: data.phone,
              primary: true,
              status: "active",
              validity: "consistent",
            },
            mailingAddress: {
              _id: "/uri-reference",
              _repo: {
                createDate: "2004-10-23T12:00:00-06:00",
                modifyDate: "2004-10-23T12:00:00-06:00",
              },
              _schema: {
                description: "Sample value",
                elevation: 19585.95,
                latitude: 87.75,
                longitude: -81.03,
              },
              city: data.city,
              country: data.country,
              countryCode: "IN",
              createdByBatchID: "/uri-reference",

              lastVerifiedDate: currSpDate,
              modifiedByBatchID: "/uri-reference",
              msaID: 29555,
              postOfficeBox: "Sample value",
              postalCode: "Sample value",
              primary: true,
              region: data.state,
              state: data.state,
              status: "active",
            },
            mobilePhone: {
              countryCode: "91",
              number: data.phone,
              primary: true,
              status: "active",
              validity: "consistent",
            },
            personalEmail: {
              address: data.email,
              primary: false,
              status: "active",
            },
          },
          productPreferences: [],
          startDate: currDate,
          status: "active",
        },
      },
    },
  };

  console.log(json.body.xdmEntity);

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
    ${{url}},
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "sandbox-name": "dentsuugamaep",
        "x-adobe-flow-id": "dentsuugamaep"
      },
      body: json,
    }
  );
  console.log(await res.json());
}
