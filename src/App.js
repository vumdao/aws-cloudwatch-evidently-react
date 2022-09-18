import logo from './logo.svg';
import './App.css';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import {withAuthenticator} from '@aws-amplify/ui-react'
import Evidently from "aws-sdk/clients/evidently";
import {Auth} from "@aws-amplify/auth";
import {useEffect, useState} from "react";

Amplify.configure(awsExports);

async function getEvaluateFeature(){

    const credentials  = await Auth.currentCredentials();
    const userinfo  = await Auth.currentUserInfo();
    console.log(userinfo)

    // Initialize the Amazon CloudWatch Evidently client
    const evidently = new Evidently({
        endpoint: 'https://evidently.ap-northeast-1.amazonaws.com',
        credentials: credentials,
        region: 'ap-northeast-1'
    });

    // API request structure
    const evaluateFeatureRequest = {
        // entityId for calling evaluate feature API
        entityId: userinfo.username,
        // Name of your feature
        feature: 'example-feature-1',
        // Name of your project
        project: "Evidently-Test-Project",
    };

    return evidently.evaluateFeature(evaluateFeatureRequest).promise();
}

function App() {

    const [variation, setVariation] = useState();

    useEffect(() => {
        (async() =>{
         const res = await getEvaluateFeature();
         console.log(res)
         console.log(res.value)
         setVariation(res.value.boolValue)
        })()
    },[])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          { variation &&
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
              Learn React
          </a>
          }
      </header>
    </div>
  );
}

export default withAuthenticator(App)

