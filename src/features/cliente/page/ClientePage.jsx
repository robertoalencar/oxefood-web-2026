import { useEffect, useState } from "react";

import { listar } from "../service/clienteService";

export default function ClientePage() {

    const [lista, setLista] = useState([]);

    useEffect(() => {

        carregar();

    }, []);

    async function carregar() {

        const data = await listar();
        setLista(data);
    }

    return (

        <div>

            <h1>Clientes</h1>

            {lista.map(cliente => (

                <div key={cliente.id}>

                    {cliente.nome} - {cliente.cpf}

                </div>

            ))}

        </div>

    );

}