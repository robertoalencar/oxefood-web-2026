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

        <div class="max-h-46 overflow-x-auto">

            <div className="flex items-center justify-between mb-6">

                <h1 className="text-3xl font-bold text-gray-800">
                    Clientes
                </h1>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
                    Novo Cliente
                </button>

            </div>

            <table class="min-w-full divide-y-2 divide-gray-200">

                <thead class="sticky top-0 bg-white ltr:text-left rtl:text-right">
                    <tr class="*:font-medium *:text-gray-900">
                        <th class="px-3 py-2 whitespace-nowrap">Nome</th>
                        <th class="px-3 py-2 whitespace-nowrap">CPF</th>
                        <th class="px-3 py-2 whitespace-nowrap">DT Nascimento</th>
                        <th class="px-3 py-2 whitespace-nowrap">Salary</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">

                    {lista.map(cliente => (

                        <tr class="*:text-gray-900 *:first:font-medium">
                            <td class="px-3 py-2 whitespace-nowrap">{cliente.nome}</td>
                            <td class="px-3 py-2 whitespace-nowrap">{cliente.cpf}</td>
                            <td class="px-3 py-2 whitespace-nowrap">{cliente.dataNascimento}</td>
                            <td class="px-3 py-2 whitespace-nowrap">$0</td>
                        </tr>

                    ))}

                </tbody>
            </table>
        </div>

    );
}