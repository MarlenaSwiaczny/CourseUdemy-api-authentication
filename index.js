import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//API from https://secrets-api.appbrewery.com/ - instructions

/* moje zapytania w postman:

    params = {username: "marlena123", password: "Secret123"}
POST https://secrets-api.appbrewery.com/register?username=marlena123&password=Secret123
    response: {"success": "Successfully registered."}

GET https://secrets-api.appbrewery.com/generate-api-key
    response: {"apiKey":"7a43f7c2-cde5-4c37-b901-226ca93ee95e"}

    params = {username: "marlena123", password: "Secret123"}
POST https://secrets-api.appbrewery.com/get-auth-token?username=marlena123&password=Secret123
    response: {"token":"087fef4e-fba3-4ba1-91bc-ec8411f6d887"}
*/

const yourUsername = "marlena123";
const yourPassword = "Secret123";
const yourAPIKey = "7a43f7c2-cde5-4c37-b901-226ca93ee95e";
const yourBearerToken = "087fef4e-fba3-4ba1-91bc-ec8411f6d887";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}random`);

    //zmiana na string:
    //console.log(JSON.stringify(response.data))

    //zmiana na string, ale wyświetlane ze spacjami i liniami:
    //console.log(JSON.stringify(response.data, undefined, 4))

    res.render("index.ejs", {
      content: JSON.stringify(response.data)
      });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message
    });
  }
  
});

app.get("/basicAuth", async (req, res) => {
  
  try {
    const response = await axios.get(`${API_URL}all?page=2`, {
      auth: {
        username: yourUsername,
        password: yourPassword
      }
    });
    res.render("index.ejs", {
      content: JSON.stringify(response.data)
      });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message
    });
  }
  
  
  
  
  //basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {

  try {
    const response = await axios.get(`${API_URL}filter?score=6&apiKey=${yourAPIKey}`);

    // lub:
    // const response = await axios.get(`${API_URL}filter`, {
    // params: {
    // score: 6,
    // apiKey: yourAPIKey
    // });


    res.render("index.ejs", {
      content: JSON.stringify(response.data)
      });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message
    });
  }
});

app.get("/bearerToken", async (req, res) => {

  try {
    const response = await axios.get(`${API_URL}secrets/42`, {
      headers: {
        "Authorization": `Bearer ${yourBearerToken}`
      }

      // lub: 
      
      // const config = {
      //   headers: {"Authorization": `Bearer ${yourBearerToken}`}
      // }
      
      // const response = await axios.get(`${API_URL}secrets/42`, config) 

    });
    res.render("index.ejs", {
      content: JSON.stringify(response.data)
      });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message
    });
  }
  
  //bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
