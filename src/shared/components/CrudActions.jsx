export default function CrudActions({ onEdit, onDelete }) {

    return (

        <div className="flex items-center gap-2">

            {/* Alterar */}

            <button className="btn btn-soft btn-warning" onClick={onEdit}>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-4"
                >

                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l10.932-10.931z"
                    />

                </svg>

                Editar

            </button>

            {/* Remover */}

            <button className="btn btn-soft btn-error" onClick={onDelete}>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-4"
                >

                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 7.5h12m-1.5 0l-.563 9.19a2.25 2.25 0 01-2.245 2.11H10.31a2.25 2.25 0 01-2.245-2.11L7.5 7.5m3 0V5.25A2.25 2.25 0 0112.75 3h-1.5A2.25 2.25 0 009 5.25V7.5"
                    />

                </svg>

                Remover

            </button>

        </div>

    );

}