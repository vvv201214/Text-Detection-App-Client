import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./upload/uploadFunctionality"
import Login from './authentication/login'

export default function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Upload />} />
                    <Route path="*" element={<Upload />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}