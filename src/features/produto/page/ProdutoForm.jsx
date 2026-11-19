import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import { atualizar, buscarPorId, cadastrar, listar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_CATEGORIA_PRODUTO } from "../../produto/service/categoriaProdutoService";
import { MAPPING_CONTROLLER_PRODUTO, saveImage } from "../../produto/service/produtoService";

export default function ProdutoForm() {

    const { idProduto } = useParams();
    const [listaCategoria, setListaCategoria] = useState([]);
    const [imagem, setImagem] = useState(null);
  	const [preview, setPreview] = useState(null);
    const [produto, setProduto] = useState({
        id: null,
        idCategoria: "",
        codigo: "",
        titulo: "",
        descricao: "",
        valorUnitario: "",
        tempoEntregaMinimo: "",
        tempoEntregaMaximo: ""
    });

    useEffect(() => {

        if (idProduto) {
            carregarProduto();
        }

        carregarCategoriasProduto();

    }, [idProduto]);

    async function carregarProduto() {

        try {

            const data = await buscarPorId(
                MAPPING_CONTROLLER_PRODUTO,
                idProduto
            );

            setProduto({
                id: data.id,
                idCategoria: data.categoria.id ?? "",
                codigo: data.codigo ?? "",
                titulo: data.titulo ?? "",
                descricao: data.descricao ?? "",
                valorUnitario: data.valorUnitario ?? "",
                tempoEntregaMinimo: data.tempoEntregaMinimo ?? "",
                tempoEntregaMaximo: data.tempoEntregaMaximo ?? "",
                imagem: data.imagem ?? ""
            });

        } catch (erro) {

            console.log(erro)
            toast.error("Erro ao carregar o produto.");
        }
    }

    async function carregarCategoriasProduto() {

        try {

            const data = await listar(MAPPING_CONTROLLER_CATEGORIA_PRODUTO);
            setListaCategoria(data);

        } catch (erro) {

            console.log(erro)
            toast.error("Erro ao carregar as categorias de produto.");
        }
    }

    async function salvar() {
        
        try {

            if (idProduto) {

                await atualizar(MAPPING_CONTROLLER_PRODUTO, produto);
                toast.success("Produto alterado com sucesso!");
                
                if (imagem) {
                    atualizaImagem(idProduto);
                }

            } else {

                const produtoCadastrado = await cadastrar(MAPPING_CONTROLLER_PRODUTO, produto);
                toast.success("Produto cadastrado com sucesso!");

                atualizaImagem(produtoCadastrado.id);
            }

        } catch (erro) {
            toast.error("Erro ao salvar o produto.");
        }
    }

    const handleImagemChange = (event) => {

        const file = event.target.files[0];
        setImagem(file);

        // Gera uma URL para visualização da imagem
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    async function atualizaImagem(idProduto) {

        try {

            let formData = new FormData();
		    formData.append('imagem', imagem);

            await saveImage(idProduto, formData);
            toast.success("Imagem cadastrada com sucesso!");

        } catch (erro) {

            console.log(erro)
            toast.error("Erro ao tentar salvar a imagem o produto.");
        }
	}

    return (

        <div>

            <Menu />

            {idProduto ? 

                <Breadcrumbs items={[
                    { label: "Produto" },
                    { label: "Alterar" }
                ]} />

                : 

                <Breadcrumbs items={[
                    { label: "Produto" },
                    { label: "Cadastrar" }
                ]} />
            }

            <div style={{ marginTop: '40px', marginLeft: '10%', marginRight: '10%' }}>

                <div className="overflow-x-auto shadow-sm">

                    <div className="flex items-center justify-between mb-6" style={{marginTop: '20px', marginLeft: '10px', marginRight: '10px'}}>

                        <h1 className="text-3xl font-bold text-gray-800">
                            {idProduto ? "Alterar Produto" : "Novo Produto"}
                        </h1>

                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{padding: '30px'}}>
                        <form>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{padding: '10px'}}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="nome">Título</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            className="input input-bordered w-full"
                                            value={produto.titulo}
                                            onChange={(e) => 
                                                setProduto({ ...produto, titulo: e.target.value }) 
                                            }
                                        />
                                    </fieldset>
                                    
                                </div>
                                <div className="card rounded-box grid grow p-8" style={{padding: '10px'}}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="nome">Código do Produto</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            className="input input-bordered w-full"
                                            value={produto.codigo}
                                            onChange={(e) => 
                                                setProduto({ ...produto, codigo: e.target.value }) 
                                            }
                                        />
                                    </fieldset>

                                </div>
                            </div>

                            <div className="card rounded-box grid grow p-8" style={{padding: '10px'}}>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Categoria</legend>
                                    <select 
                                        className="select  w-full"
                                        value={produto.idCategoria}
                                        onChange={(e) => 
                                            setProduto({ ...produto, idCategoria: e.target.value }) 
                                        }
                                    >
                                        <option value="">Selecione ...</option>
                                        {listaCategoria.map((categoria, index) => (
                                            <option key={index} value={categoria.id}>
                                                {categoria.descricao}
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>

                            </div>

                            <div className="card rounded-box grid grow p-8" style={{padding: '10px'}}>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Descrição</legend>
                                    <textarea 
                                        className="textarea h-48 w-full"
                                        value={produto.descricao}
                                        onChange={(e) => 
                                            setProduto({ ...produto, descricao: e.target.value }) 
                                        }
                                    ></textarea>
                                </fieldset>
                                
                            </div>

                            <div className="flex w-full" >
                                
                                <div className="card rounded-box grid grow p-8" style={{padding: '10px'}}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="nome">Valor Unitário</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            className="input input-bordered w-full"
                                            value={produto.valorUnitario}
                                            onChange={(e) => 
                                                setProduto({ ...produto, valorUnitario: e.target.value }) 
                                            }
                                        />
                                    </fieldset>
                                    
                                </div>
                                <div className="card rounded-box grid grow p-8" style={{padding: '10px'}}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="nome">Tempo Mínimo de Entrega (em minutos)</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            className="input input-bordered w-full"
                                            value={produto.tempoEntregaMinimo}
                                            onChange={(e) => 
                                                setProduto({ ...produto, tempoEntregaMinimo: e.target.value }) 
                                            }
                                        />
                                    </fieldset>

                                </div>

                                <div className="card rounded-box grid grow p-8" style={{padding: '10px'}}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="nome">Tempo Máximo de Entrega (em minutos)</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            className="input input-bordered w-full"
                                            value={produto.tempoEntregaMaximo}
                                            onChange={(e) => 
                                                setProduto({ ...produto, tempoEntregaMaximo: e.target.value }) 
                                            }
                                        />
                                    </fieldset>

                                </div>
                            </div>

                            <div className="card rounded-box grid grow p-8" style={{ padding: '10px' }}>

                                <fieldset className="fieldset w-full">

                                    <label className="fieldset-legend" htmlFor="imagem">
                                        Imagem do Produto
                                    </label>

                                    <input
                                        type="file"
                                        id="imagem"
                                        accept="image/*"
                                        onChange={handleImagemChange}
                                        className="file-input file-input-bordered w-full"
                                    />

                                </fieldset>

                                {/* Visualização da imagem selecionada */}
                                {preview && (

                                    <div className="mt-4">

                                        <p className="text-sm font-semibold text-gray-600 mb-2">
                                            Pré-visualização da imagem:
                                        </p>

                                        <img
                                            src={preview}
                                            alt="Pré-visualização do produto"
                                            className="w-40 h-40 object-contain border border-gray-300 rounded-lg p-2"
                                        />

                                    </div>

                                )}

                                {/* Visualização da imagem já cadastrada */}
                                {!preview && produto.imagem && (

                                    <div className="mt-4">

                                        <p className="text-sm font-semibold text-gray-600 mb-2">
                                            Imagem cadastrada:
                                        </p>

                                        <img
                                            src={`/imagens_cadastradas/${produto.imagem}`}
                                            alt="Imagem do produto"
                                            className="w-40 h-40 object-contain border border-gray-300 rounded-lg p-2"
                                        />

                                    </div>

                                )}

                            </div>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{padding: '10px'}}>

                                    <div style={{marginTop: '50px', textAlign: 'left'}}>
                                        <BackButton destino="/produto" />
                                    </div>
                                    
                                </div>
                                <div className="card rounded-box grid grow p-8" style={{padding: '10px'}}>

                                    <div style={{marginTop: '50px', textAlign: 'right'}}>
                                        <SaveButton save={() => salvar()} />
                                    </div>

                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            <Footer />

        </div>

    );
}