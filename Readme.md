# Progetto Finale Start2Impact

## Descrizione

Il progetto prevede la creazione di un'app Full-Stack che possa gestire delle chiamate API RESTful e che implementi un sistema di login/logout e registrazione dell'utente.

## Link

[Versione live del progetto](https://circles-s2i.com)

## Come testare il progetto in locale

1. Clonare il progetto in locale, poi eseguire `npm install` in entrambe le cartelle per installare tutte le dipendenze necessarie.
2. Creare un Database MongoDB e settare le variabili presenti nel file `.env.example` presente nella cartella "api", rinominarlo poi come file `.env`.
3. I due framework vanno avviati su porte diverse (default 4321 per il Backend e 3000 per il Frontend) per comunicare in localhost.

## Costruito con:

### Front-End:

- React / Next.js
- TailwindCSS
- React Icons

### Back-End:

- Node.js
- Dotenv
- Express
- Cookie-parser
- JWT
- MongoDB
- Mongoose

### Hosting

- Front-End: [Vercel](https://vercel.com/)
- Back-End: [Render](https://render.com/)
- Database: [MongoDB Atlas](https://www.mongodb.com/it-it/atlas/database)
- Domain: [Cloudflare](https://www.cloudflare.com/it-it/)

## Cosa ho costruito:

Ho creato un'applicazione che simula alcune delle funzionalità base di alcuni social network come Twitter. Su questa applicazione, chiamata "Circles", gli utenti possono registrarsi per scrivere piccoli post di varia natura o per lasciare "mi piace" e "commenti" sotto i post degli altri utenti.
All'utente sono permesse anche alcune ulteriori azioni basilari, come la possibilità di modificare/cancellare i propri post e commenti o come la possibilità di aggiornare il proprio profilo.

### Struttura

Grazie alla struttura della single page application, è possibile visualizzare e creare tutti i contenuti sulla homepage. Nel proprio profilo sarà possibile modificare, cancellare e visualizzare i propri post, nonché visionare e modificare i propri dati personali. Ogni post e ogni commento mostra la propria data di creazione e, se modificato nel corso del tempo, la data di modifica. Le modifiche avvenute ai post, ai commenti e al proprio profilo, così come le comparse delle modali e dei caricamenti, sono state implementate sfruttando gli hooks di React come useState e useEffect.

### Utilizzo di Typescript

Non meno importante, TypeScript è stato implementato in modo approfondito per controllare ogni tipo di dato che sia in chiamata, in risposta o passato fra i vari componenti, in modo da non dover utilizzare variabili "any", con l'ausilio anche di tipi e interfacce custom.

### Sistema di autenticazione

Il sistema di autenticazione si basa sull'utilizzo del token creato utilizzando JWT, che viene impostato sul browser come cookie di sola lettura e da cui poi diende il flusso di navigazione dell'applicazione. Una volta autenticati è possibile visitare il feed e il proprio profilo, ma non le pagine di login e registrazione. Viceversa, queste due saranno disponibili senza aver effettuato l'accesso, ma il resto sarà bloccato.

### Database

Il database, per scelta MongoDB, è stato gestito tramite l'utilizzo di Mongoose, un ODM che mette a disposizione interessanti strumenti sia per la scrittura delle query (utilizzando un'API orientata agli oggetti) che per la gestione delle entità, grazie agli Schemi e ai Modelli che lo contraddistinguono.

### Design

L'app è totalmente responsive e include anche uno switch per il tema chiaro/scuro. Il design è moderno, semplice ed è stato ampiamente ispirato dagli strumenti che TailwindCSS mette a disposizione. Non mancano feedback all'utente nei form e nelle pagine.

## Screenshots

### Mobile view

![login-mobile](/screenshots/login-mobile.png)
![profile-mobile](/screenshots/profile-mobile.png)
![home-mobile](/screenshots/home-mobile.png)

### Desktop view

![login-desktop](/screenshots/login-desktop.png)
![home-desktop](/screenshots/home-desktop.png)
![profile-desktop](/screenshots/profile-desktop.png)
