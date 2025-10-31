import { FirebaseAppProvider, FirebaseAuthProvider } from 'reactfire';
import app from './firebase.config';

function App() {
  return (
    <FirebaseAppProvider firebaseApp={app}>
      <FirebaseAuthProvider firebaseApp={app}>
        {/* Your app code goes here */}
      </FirebaseAuthProvider>
    </FirebaseAppProvider>
  );
}

export default App;"" 
