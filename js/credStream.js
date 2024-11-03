async function regStream(data) {
  
  console.log("Intiated data send");
  console.log('ECID '+_satellite.getVar('ECID'))
  var ecid=_satellite.getVar('ECID')
  let currDate = new Date().toISOString();
  let currSpDate=currDate.toString().split('T')[0]
  var pid = "P" + Math.round((1 + Math.random()) * 10000);
  var yob = Number(data.dob.split("-")[0]);
  var json = {
    header: {
      schemaRef: {
        id: "https://ns.adobe.com/cognizanttechnologys/schemas/a79249fddd0d120a471ec0e95892b6487624b3074b3263c4",
        contentType: "application/vnd.adobe.xed-full+json;version=1.0",
      },
      imsOrgId: "D1D7123F524450A60A490D45@AdobeOrg",
      datasetId: "66fdb11a250ffa2aefe3547f",
      source: {
        name: "Service Expt Profile DI",
      },
    },
    body: {
      xdmMeta: {
        schemaRef: {
          id: "https://ns.adobe.com/cognizanttechnologys/schemas/a79249fddd0d120a471ec0e95892b6487624b3074b3263c4",
          contentType: "application/vnd.adobe.xed-full+json;version=1.0",
        },
      },
      xdmEntity: {
        _cognizanttechnologys: {
          service_expt_identification: {
            crmId: pid,
            ecid: ecid,
            emailId: data.email,
            emailIdSha256: data.email,
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
        preferredLanguage: "en-GB",
        timeZone: "America/Barbados",
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
    "https://dcs.adobedc.net/collection/d9c88a2e9a43f3db55d17944ef24ded2dc78cf54b9e904790e15acc6933d1a54",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "sandbox-name": "prod",
        "Authorization":
          "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3MzA1MzQxNjM2MDdfYTAyMWI2NGYtODRhMi00ZjAwLWI2NzItMWU1NzdiZGU4NzQ4X3V3MiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJleGNfYXBwIiwidXNlcl9pZCI6IkE0RjcyNTBFNjNENzk5QjEwQTQ5NUZGNUA3ZTY2MWYzYjYzMWMxNmU5NDk1ZmM3LmUiLCJzdGF0ZSI6IntcInNlc3Npb25cIjpcImh0dHBzOi8vaW1zLW5hMS5hZG9iZWxvZ2luLmNvbS9pbXMvc2Vzc2lvbi92MS9ZVGxpTkRBMk1qQXRORFF5TVMwME9HSXhMV0kwWVRRdE9EVTFabUpsT0RRNU1UVmpMUzB4TkRVek5FWTBOVFl5UVRGQ1FUTXdNRUUwT1RWRE1rSkFRV1J2WW1WSlJBXCJ9IiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiIxNDUzNEY0NTYyQTFCQTMwMEE0OTVDMkJAQWRvYmVJRCIsImN0cCI6MCwiZmciOiJZNUw1WTI3UVhQUDdNSFdLRk9RVllIQUFWTT09PT09PSIsInNpZCI6IjE3MjQ3NTc1NzI2NjBfYzY5NjJlMmYtYWVkNy00MTUwLWExNGEtYjdmZTE2NjBjMjcxX3V3MiIsIm1vaSI6IjQwYWY2MDc5IiwicGJhIjoiTWVkU2VjTm9FVixMb3dTZWMiLCJleHBpcmVzX2luIjoiODY0MDAwMDAiLCJzY29wZSI6ImFiLm1hbmFnZSxhY2NvdW50X2NsdXN0ZXIucmVhZCxhZGRpdGlvbmFsX2luZm8sYWRkaXRpb25hbF9pbmZvLmpvYl9mdW5jdGlvbixhZGRpdGlvbmFsX2luZm8ucHJvamVjdGVkUHJvZHVjdENvbnRleHQsYWRkaXRpb25hbF9pbmZvLnJvbGVzLEFkb2JlSUQsYWRvYmVpby5hcHByZWdpc3RyeS5yZWFkLGFkb2JlaW9fYXBpLGF1ZGllbmNlbWFuYWdlcl9hcGksY3JlYXRpdmVfY2xvdWQsbXBzLG9wZW5pZCxvcmcucmVhZCxwcHMucmVhZCxyZWFkX29yZ2FuaXphdGlvbnMscmVhZF9wYyxyZWFkX3BjLmFjcCxyZWFkX3BjLmRtYV90YXJ0YW4sc2Vzc2lvbiIsImNyZWF0ZWRfYXQiOiIxNzMwNTM0MTYzNjA3In0.Pu_HvjelQjMLf-M4NAFFPSbhCbdtNQvGz0Gfeq2qCuGBVtKIIRy7Fna1lz2OyegHwPhYUxZviOM0Xc_8h-azfW8TjW8GTW05pgIW2asXGTrjyaUAlfniT7WcaioHDOixCsBT5GMx0JxnTSUzFOVOaMUJx437NMD9S5BHpR6LDHx7TUvsu1jjQwasSfFavyb9645vrktkMFvgxN_tCeoJD3UQGhW_ZJ7mNICLtOikhkN5_kuBRKN9mdMr-TJBsthYqi8FUfC4bH1DLWkhLijLH-DSakPc2wzowU1L6dhCJVr65XPTZB4hVKCF7aWdgpI-shWRYCGW1aSNePYGxiB2AQ",
        "x-adobe-flow-id": "5bb91d23-4d82-4dca-ae90-8af97e399def",
      },
      body: json,
    }
  );
  console.log(await res.json());
}
