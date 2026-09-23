import { BrowserRouter, Route, Routes } from "react-router-dom";

import CategoriaProdutoForm from "../features/categoriaproduto/page/CategoriaProdutoForm";
import CategoriaProdutoPage from "../features/categoriaproduto/page/CategoriaProdutoPage";
import ClienteForm from "../features/cliente/page/ClienteForm";
import ClientePage from "../features/cliente/page/ClientePage";
import HomePage from "../features/home/page/Home";
import ProdutoPage from "../features/produto/page/ProdutoPage";

export default function Router() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<HomePage />} />
                
                <Route path="/cliente" element={<ClientePage />} />
                <Route path="/cliente-form/:idCliente?" element={<ClienteForm />} />

                <Route path="/produto" element={<ProdutoPage />} />

                <Route path="/categoriaproduto" element={<CategoriaProdutoPage />} />
                <Route path="/categoriaproduto-form/:idCategoria?" element={<CategoriaProdutoForm />} />

            </Routes>

        </BrowserRouter>

    );

}