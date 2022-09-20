import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { Amplify, Auth } from "aws-amplify";
import awsExports from "./aws-exports";
import {withAuthenticator} from '@aws-amplify/ui-react'
import { Evidently } from '@aws-sdk/client-evidently';
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SignInHeader } from "./SignInHeader";
import { SignInFooter } from "./SignInFooter";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

Amplify.configure(awsExports);

async function getEvaluateFeature(){
  const credentials  = await Auth.currentCredentials();
  const userinfo  = await Auth.currentUserInfo();

  console.log(userinfo)

  // Initialize the Amazon CloudWatch Evidently client
  const evidently = new Evidently({
    endpoint: 'https://evidently.ap-southeast-1.amazonaws.com',
    credentials: credentials,
    region: 'ap-southeast-1'
  });

  // API request structure
  const evaluateFeatureRequest = {
    // entityId for calling evaluate feature API
    entityId: userinfo.username,
    // Name of your feature
    feature: 'sin-d1-evidently-demo-evaluation-demo',
    // Name of your project
    project: "sin-d1-evidently-demo-evidently-demo",
  };

  return evidently.evaluateFeature(evaluateFeatureRequest);
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

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: 'dark',
          primary: {
           main: '#FFFFFF',
         },
         secondary: {
           main: '#e50914',
         },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default withAuthenticator(App, {
  components: {
    Header,
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter
    },
    Footer
  }
});