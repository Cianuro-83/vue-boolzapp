console.log("Ciao Cianuro... Oggi l'esercizio è BOOLZAP");

//********************
//VARIABILI GENERALI
//*********************

let contacts = [
  {
    name: "Michele",
    avatar: "./img/1-michele.png",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Hai portato a spasso il cane?",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Ricordati di stendere i panni",
        status: "sent",
      },
      {
        date: "10/01/2020 16:15:22",
        message: "Tutto fatto!",
        status: "received",
      },
    ],
  },
  {
    name: "Fabio",
    avatar: "./img/2-fabio.png",
    visible: true,
    messages: [
      {
        date: "20/03/2020 16:30:00",
        message: "Ciao come stai?",
        status: "sent",
      },
      {
        date: "20/03/2020 16:30:55",
        message: "Bene grazie! Stasera ci vediamo?",
        status: "received",
      },
      {
        date: "20/03/2020 16:35:00",
        message: "Mi piacerebbe ma devo andare a fare la spesa.",
        status: "sent",
      },
    ],
  },
  {
    name: "Samuele",
    avatar: "./img/3-samuele.png",
    visible: true,
    messages: [
      {
        date: "28/03/2020 10:10:40",
        message: "La Marianna va in campagna",
        status: "received",
      },
      {
        date: "28/03/2020 10:20:10",
        message: "Sicuro di non aver sbagliato chat?",
        status: "sent",
      },
      {
        date: "28/03/2020 16:15:22",
        message: "Ah scusa!",
        status: "received",
      },
    ],
  },
  {
    name: "Alessandro B.",
    avatar: "./img/4-alessandroB.png",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Lo sai che ha aperto una nuova pizzeria?",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Si, ma preferirei andare al cinema",
        status: "received",
      },
    ],
  },
  {
    name: "Alessandro L.",
    avatar: "./img/5-AlessandroL.png",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Ricordati di chiamare la nonna",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Va bene, stasera la sento",
        status: "received",
      },
    ],
  },
  {
    name: "Claudia",
    avatar: "./img/6-claudia.png",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Ciao Claudia, hai novità?",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Non ancora",
        status: "received",
      },
      {
        date: "10/01/2020 15:51:00",
        message: "Nessuna nuova, buona nuova",
        status: "sent",
      },
    ],
  },
  {
    name: "Federico",
    avatar: "./img/7-federico.png",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Fai gli auguri a Martina che è il suo compleanno!",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Grazie per avermelo ricordato, le scrivo subito!",
        status: "received",
      },
    ],
  },
  {
    name: "Davide",
    avatar: "./img/8-davide.png",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Ciao, andiamo a mangiare la pizza stasera?",
        status: "received",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
        status: "sent",
      },
      {
        date: "10/01/2020 15:51:00",
        message: "OK!!",
        status: "received",
      },
    ],
  },
];

//---------------------------------------------------------------------------
// ||||||||||||||||||||||||||| VUE ||||||||||||||||||||||||||||
//---------------------------------------------------------------------------
const { createApp } = Vue;

createApp({
  //   START DATA
  data() {
    return {
      message: "CIAO CIANURO!",
      contacts: contacts,
      currentChat: 0,
      currentMessage: 0,
      cerca: "",
      inviaMessaggio: "",
      DateTime: luxon.DateTime,

      //  END DATA RETURN
    };
    //------------------------------------------------------------------------
    //   END DATA
  },
  //--------------------------------------------------------------------------
  //  START METHODS
  methods: {
    selezionaContattoAttivo(currentIndex) {
      this.currentChat = currentIndex;
    },
    nuovoMessaggio(currentChat) {
      const nuovoMessaggio = this.inviaMessaggio.trim();
      if (nuovoMessaggio === "") {
        this.inviaMessaggio = "";
        return;
      }
      const contenutoNuovoMessaggio = {
        date: this.dataOdierna,
        message: "",
        status: "sent",
      };
      contenutoNuovoMessaggio.message = nuovoMessaggio;
      const sentMessage = this.contacts[currentChat].messages;
      sentMessage.push(contenutoNuovoMessaggio);
      this.inviaMessaggio = "";

      setTimeout(() => {
        const autoReplayMessage = {
          date: this.dataOdierna,
          message: "OK!!",
          status: "received",
        };
        sentMessage.push(autoReplayMessage);
      }, 1000);
    },
    inputCercaContatto() {
      let find = this.cerca.trim();
      console.log(find);
    },
    resetCerca() {
      this.cerca = "";
    },

    //-----------------------------------------------------------------------
    //   END METHODS
  },
  //-------------------------------------------------------------------------
  //  START COMPUTED
  computed: {
    filtra() {
      let contatto = this.contacts;
      console.log("Contatti totali: ", contatto);
      let filtred = contatto.filter((obj) => {
        return obj.name
          .toString()
          .toLowerCase()
          .includes(this.cerca.toString().toLowerCase());
      });
      console.log("Contatti filtrati: ", filtred);
      if (this.cerca === "") {
        return this.contacts;
      } else {
        return filtred;
      }
    },
    dataOdierna() {
      const now = this.DateTime.now();
      console.log(now);

      const oggi = now.toFormat("dd/LL/yyyy HH:mm");
      // console.log("ciao ", oggi);
      return oggi;
    },
    oraInvioMessaggio() {
      let orario =
        this.filtra[this.currentChat].messages[this.currentMessage].date;
      console.log("cianuro strunz ", orario);
      let onlyTime = this.DateTime.fromFormat(orario, "dd/LL/yyyy HH:mm:ss");
      console.log(onlyTime);
      return onlyTime.toFormat("HH:mm");

      // for (let i = 0; i < this.filtra[this.currentChat].messages.lenght; i++) {
      //   let orario = this.filtra[this.currentChat].messages[i].date;
      //   console.log("cianuro strunz ", orario);
      //   let onlyTime = this.DateTime.fromFormat(orario, "dd/LL/yyyy HH:mm:ss");
      //   console.log(onlyTime);
      //   return onlyTime.toFormat("HH:mm");
      // }
    },
    //---------------------------------------------------------------------------
    // END COMPUTED
  },
  //---------------------------------------------------------------------------
}).mount("#app");
//---------------------------------------------------------------------------
// ||||||||||||||||||||||||||| VUE ||||||||||||||||||||||||||||
//---------------------------------------------------------------------------

// const { DateTime } = luxon;
