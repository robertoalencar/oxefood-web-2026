import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClienteForm from "../features/cliente/page/ClienteForm";
import ClientePage from "../features/cliente/page/ClientePage";
import HomePage from "../features/home/page/Home";
import ProdutoPage from "../features/produto/page/ProdutoPage";

export default function Router() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/home" element={<HomePage />} />
                
                <Route path="/cliente" element={<ClientePage />} />
                <Route path="/cliente-form/:idCliente?" element={<ClienteForm />} />

                <Route path="/produto" element={<ProdutoPage />} />

            </Routes>

        </BrowserRouter>

    );

}