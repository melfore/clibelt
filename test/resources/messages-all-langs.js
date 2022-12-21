exports.messages = [
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
  },
  {
    code: "http.error.code.400",
    tr: [
      { l: "en", v: "Sorry, the request is wrong (400)" },
      { l: "it", v: "Siamo spiacenti, la richiesta è errata (400)" },
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
    code: "http.error.code.generic",
    tr: [
      { l: "en", v: "Generic comunication error" },
      { l: "it", v: "Errore di comunicazione generica" },
    ],
  },
  {
    code: "I18N_SELECTED",
    tr: [
      { l: "en", v: "Selected" },
      { l: "it", v: "Selezionati" },
    ],
  },
  {
    code: "I18N_SIGN_IN",
    tr: [
      { l: "en", v: "Sign in" },
      { l: "it", v: "Collegati" },
    ],
  },
  {
    code: "I18N_TABLE_ACTIONS",
    tr: [
      { l: "en", v: "Actions" },
      { l: "it", v: "Operazioni" },
    ],
  },
  {
    code: "I18N_USER",
    tr: [
      { l: "en", v: "User" },
      { l: "it", v: "Utente" },
    ],
  },

  {
    code: "i18n.codes.defect.severity.AVERAGE",
    tr: [
      { l: "en", v: "Average" },
      { l: "it", v: "Medio" },
    ],
  },
  {
    code: "i18n.codes.defect.severity.SEVERE",
    tr: [
      { l: "en", v: "Severe" },
      { l: "it", v: "Grave" },
    ],
  },
  {
    code: "i18n.codes.defect.severity.SLIGHT",
    tr: [
      { l: "en", v: "Slight" },
      { l: "it", v: "Lieve" },
    ],
  },
  {
    code: "i18n.codes.defect.types.OTHERS",
    tr: [
      { l: "en", v: "Others" },
      { l: "it", v: "Altro" },
    ],
  },
  {
    code: "i18n.codes.defect.types.STANDARD",
    tr: [
      { l: "en", v: "Standard" },
      { l: "it", v: "Standard" },
    ],
  },
  {
    code: "i18n.codes.instrumentation.-",
    tr: [
      { l: "en", v: "-" },
      { l: "it", v: "-" },
    ],
  },

  {
    code: "i18n.text.user.ADD",
    tr: [
      { l: "en", v: "Add user" },
      { l: "it", v: "Aggiungi utente" },
    ],
  },
  {
    code: "i18n.text.user.avatar.change.dialog.choose.file",
    tr: [
      { l: "en", v: "Choose a file" },
      { l: "it", v: "Scegliere un file" },
    ],
  },
  {
    code: "i18n.text.user.avatar.change.dialog.title",
    tr: [
      { l: "en", v: "Change the current user's profile picture" },
      { l: "it", v: "Cambia immagine del profilo dell'utente corrente" },
    ],
  },
  {
    code: "i18n.text.user.CREATE",
    tr: [
      { l: "en", v: "Create new user" },
      { l: "it", v: "Crea nuovo utente" },
    ],
  },
  {
    code: "i18n.text.user.DELETE",
    tr: [
      { l: "en", v: "Delete user" },
      { l: "it", v: "Cancella utente" },
    ],
  },
  {
    code: "i18n.text.user.diag.button.reset",
    tr: [
      { l: "en", v: "Reset password" },
      { l: "it", v: "Reset password" },
    ],
  },
  {
    code: "i18n.text.user.diag.disabled",
    tr: [
      { l: "en", v: "Disabled" },
      { l: "it", v: "Disabilitato" },
    ],
  },
  {
    code: "i18n.text.user.diag.email",
    tr: [
      { l: "en", v: "E-Mail" },
      { l: "it", v: "E-Mail" },
    ],
  },
  {
    code: "i18n.text.user.diag.enabled",
    tr: [
      { l: "en", v: "Enabled" },
      { l: "it", v: "Abilitato" },
    ],
  },
  {
    code: "i18n.text.user.diag.firstName",
    tr: [
      { l: "en", v: "First Name" },
      { l: "it", v: "Nome" },
    ],
  },
  {
    code: "i18n.text.user.diag.lastName",
    tr: [
      { l: "en", v: "Last Name" },
      { l: "it", v: "Cognome" },
    ],
  },
  {
    code: "i18n.text.user.diag.password",
    tr: [
      { l: "en", v: "Password" },
      { l: "it", v: "Password" },
    ],
  },
  {
    code: "i18n.text.user.diag.password.check",
    tr: [
      { l: "en", v: "Confirm password" },
      { l: "it", v: "Conferma password" },
    ],
  },
  {
    code: "i18n.text.user.diag.roles",
    tr: [
      { l: "en", v: "Roles" },
      { l: "it", v: "Ruoli" },
    ],
  },
  {
    code: "i18n.text.user.diag.username",
    tr: [
      { l: "en", v: "Username" },
      { l: "it", v: "Nome utente" },
    ],
  },
  {
    code: "i18n.text.user.EDIT",
    tr: [
      { l: "en", v: "Edit user" },
      { l: "it", v: "Modifica utente" },
    ],
  },
  {
    code: "i18n.text.user.password.change.dialog.title",
    tr: [
      { l: "en", v: "Change the current user's password" },
      { l: "it", v: "Cambia password dell'utente corrente" },
    ],
  },
  {
    code: "i18n.text.user.password.reset.dialog.title",
    tr: [
      { l: "en", v: "Change password for user" },
      { l: "it", v: "Cambia password dell'utente " },
    ],
  },
  {
    code: "i18n.text.user.th.disabled",
    tr: [
      { l: "en", v: "Disabled" },
      { l: "it", v: "Disabilitato" },
    ],
  },
  {
    code: "i18n.text.user.th.email",
    tr: [
      { l: "en", v: "E-Mail" },
      { l: "it", v: "E-Mail" },
    ],
  },
  {
    code: "i18n.text.user.th.firstName",
    tr: [
      { l: "en", v: "First Name" },
      { l: "it", v: "Nome" },
    ],
  },
  {
    code: "i18n.text.user.th.lastName",
    tr: [
      { l: "en", v: "Last Name" },
      { l: "it", v: "Cognome" },
    ],
  },
  {
    code: "i18n.text.user.th.roles",
    tr: [
      { l: "en", v: "Roles" },
      { l: "it", v: "Ruoli" },
    ],
  },
  {
    code: "i18n.text.user.th.username",
    tr: [
      { l: "en", v: "Username" },
      { l: "it", v: "Nome utente" },
    ],
  },
];
