import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthenticationForm from "../features/authentication/page/AuthenticationForm";
import CategoriaProdutoForm from "../features/categoriaproduto/page/CategoriaProdutoForm";
import CategoriaProdutoPage from "../features/categoriaproduto/page/CategoriaProdutoPage";
import ClienteForm from "../features/cliente/page/ClienteForm";
import ClientePage from "../features/cliente/page/ClientePage";
import HomePage from "../features/home/page/Home";
import ProdutoForm from "../features/produto/page/ProdutoForm";
import ProdutoPage from "../features/produto/page/ProdutoPage";
import ProtectedRoute from "../shared/util/ProtectedRoute";

export default function Router() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<AuthenticationForm />} />

                <Route 
                    path="/home" 
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    } 
                />
                
                <Route 
                    path="/cliente" 
                    element={
                        <ProtectedRoute>
                            <ClientePage />
                        </ProtectedRoute>
                    } 
                />

                <Route 
                    path="/cliente-form/:idCliente?" 
                    element={
                        <ProtectedRoute>
                            <ClienteForm />
                        </ProtectedRoute>
                    } 
                />

                <Route path="/produto" 
                    element={
                        <ProtectedRoute>
                            <ProdutoPage />
                        </ProtectedRoute>
                    } />

                <Route path="/produto-form/:idProduto?" 
                    element={
                        <ProtectedRoute>
                            <ProdutoForm />
                        </ProtectedRoute>
                    } 
                />

                <Route path="/categoriaproduto" 
                    element={
                        <ProtectedRoute>
                            <CategoriaProdutoPage />
                        </ProtectedRoute>
                    } 
                />

                <Route path="/categoriaproduto-form/:idCategoria?" 
                    element={
                        <ProtectedRoute>
                            <CategoriaProdutoForm />
                        </ProtectedRoute>
                    } 
                />

            </Routes>

        </BrowserRouter>

    );

}