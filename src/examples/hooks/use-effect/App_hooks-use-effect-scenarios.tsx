import UseEffect_Cleanup from "./UseEffect-cleanup";
import UseEffect_authStatus from "./UseEffect-auth-status";
import UseEffect_dataFetch from "./UseEffect-data-fetch";
import UseEffect_derivedState from "./UseEffect-derived-state";
import UseEffect_externalSync from "./UseEffect-external-sync";
import UseEffect_formValidation from "./UseEffect-form-validation";
import UseEffect_stateWithRefs from "./UseEffect-state-with-refs";

export default function App() {

  return (
    <>
      <h1>useEffect Scenarios</h1>
      <UseEffect_Cleanup />
      <UseEffect_externalSync />
      <UseEffect_derivedState />
      <UseEffect_dataFetch />
      <UseEffect_stateWithRefs />
      <UseEffect_authStatus />
      <UseEffect_formValidation />
    </>
  );
}
