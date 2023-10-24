"use client"
// import "@appwrite.io/pink";
import { Client, Functions } from "appwrite";
// import { useState } from "react";

// export default function Home() {
//   const [text, setText] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...text, [e.target.name]: e.target.value });
//   };
  // const client = new Client();

//   const functions = new Functions(client);

//   client
//     .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
//     .setProject("653502df9702d9846ab0"); // Your project ID
//   const getQuote = async () => {
//     try {
//       const response = await functions.createExecution(
//         "6535081f8436b42ed587",
//         JSON.stringify({ text }),
//         false,
//         "/",
//         "POST",
//         {}
//       );
//       const result = JSON.parse(response.responseBody);
//       const body = JSON.parse(result.body);
//       console.log(body);
//     } catch (error) {
//       console.error("Error fetching the quote:", error);
//     }
//   };
//   return (
//     <main class="main-content">
//       <div class="top-cover u-padding-block-end-56">
//         <div class="container">
//           <div class="u-flex u-gap-16 u-flex-justify-center u-margin-block-start-16">
//             <h1 class="heading-level-1">Censor with Redact API Demo</h1>
//             <code class="u-un-break-text"></code>
//           </div>
//           <p
//             class="body-text-1 u-normal u-margin-block-start-8"
//             // style="max-width: 50rem"
//           >
//             Use this page to test your implementation with Redact API. Enter
//             text and receive the censored message as a response.
//           </p>
//         </div>
//       </div>
//       <div class="container u-margin-block-start-negative-56">
//         <div class="card u-flex u-gap-24 u-flex-vertical">
//           <div class="u-flex u-cross-center u-gap-8">
//             <div class="input-text-wrapper is-with-end-button u-width-full-line">
//               <input
//                 type="search"
//                 value={text}
//                 onChange={handleChange}
//                 placeholder="Message"
//               />
//               <div class="icon-search" aria-hidden="true"></div>
//             </div>

//             <button class="button" onClick={getQuote}>
//               <span class="text">Censor</span>
//             </button>
//           </div>
//           <template>
//             <div class="u-flex u-flex-vertical u-gap-12">
//               <div class="u-flex u-flex-vertical u-gap-12 card">
//                 <div class="u-flex u-gap-12">
//                   <h5 class="eyebrow-heading-2">Redact API:</h5>
//                 </div>

//                 <div
//                 // style="overflow-x: hidden;

//                 // line-break: anywhere"
//                 >
//                   <p class="u-color-text-gray"></p>
//                 </div>
//               </div>
//             </div>
//           </template>
//         </div>
//       </div>
//     </main>
//   );
// }

import { useEffect, useState } from "react";
// import { createClient } from "appwrite";

const client = new Client();

  const functions = new Functions(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject("653502df9702d9846ab0"); // Your project ID

// const client = new createClient({
//   endpoint: "https://cloud.appwrite.io/v1",
//   project: "653502df9702d9846ab0",
// });

const censorEmail = async (email) => {
  try {
    const response = await functions.createExecution(
      "6535081f8436b42ed587",
      JSON.stringify({
        email,
      }),
      false,
      "/",
      "POST"
    );

    const result = JSON.parse(response.responseBody);
    const body = JSON.parse(result.body);
    console.log(body);

    // if (response.$id) {
    //   // The response will contain the censored email or the original email with sensitive data redacted.
    //   return response.censoredEmail; console.log(response.censoredEmail);
    // } else {
    //   console.error("Function execution failed");
    // }
  } catch (error) {
    console.error("Error executing function:", error);
  }
};

export default function CensorEmailComponent() {
  const [email, setEmail] = useState("");
  const [censoredEmail, setCensoredEmail] = useState("");

  const handleCensorEmail = async () => {
    const censored = await censorEmail(email);
    setCensoredEmail(censored);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleCensorEmail}>Censor Email</button>
      <div>
        <p>Censored Email: {censoredEmail}</p>
      </div>
    </div>
  );
}
