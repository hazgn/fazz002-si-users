import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";

import Home from "./views/Home";
import Edit from "./views/Edit";
import NotFound from "./views/NotFound";

import store from './redux/store'

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
