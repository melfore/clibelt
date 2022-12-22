module.exports = [
  {
    code: "error.code.login.failed",
    tr: [
      {
        l: "en",
        v: "Access denied. Please check your credentials and retry",
      },
      {
        l: "it",
        v: "Accesso negato. Controllare le credenziali e riprovare",
      },
    ],
    overrides: [
      {
        customer: "c1",
        tr: [
          {
            l: "en",
            v: "Access denied C1",
          },
          {
            l: "it",
            v: "Accesso negato C1",
          },
        ],
      },
      {
        customer: "c2",
        tr: [
          {
            l: "en",
            v: "Access denied C2",
          },
          {
            l: "it",
            v: "Accesso negato C2",
          },
        ],
      },
    ],
  },
  {
    code: "http.error.code.400",
    tr: [
      { l: "en", v: "Sorry, the request is wrong (400)" },
      { l: "it", v: "Siamo spiacenti, la richiesta è errata (400)" },
    ],
  },
];
