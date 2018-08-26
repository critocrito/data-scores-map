// @flow
import * as React from "react";
import Store from "./store";

export default React.createContext({store: new Store()});
