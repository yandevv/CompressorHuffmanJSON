import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { huffmanEncoding, huffmanDecoding } from './utils/huffmanCode';

function App() {
	const [toEncodeData, setToEncodeData] = useState<string>("");
	const [encodedJSON, setEncodedJSON] = useState<string>("");

	const [toDecodeJSON, setToDecodeJSON] = useState<string>("");
	const [decodedData, setDecodedData] = useState<string>("");

	function encodeHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setEncodedJSON(huffmanEncoding(toEncodeData));
	}

	function decodeHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setDecodedData(huffmanDecoding(toDecodeJSON));
	}

	async function copyToClipBoardJSONHandler() {
		const toastParams = {
			pending: "Copiando para a área de transferência.",
			success: "Copiado para a área de transferência.",
			error: "Erro ao copiar para a área de transferência."
		};
		toast.promise(async () => await navigator.clipboard.writeText(encodedJSON), toastParams, { autoClose: 3000, position: 'bottom-right' });
	}

	async function copyToClipBoardDataHandler() {
		const toastParams = {
			pending: "Copiando para a área de transferência.",
			success: "Copiado para a área de transferência.",
			error: "Erro ao copiar para a área de transferência."
		};

		if(decodedData === "")
			return;

		toast.promise(async () => await navigator.clipboard.writeText(decodedData), toastParams, { autoClose: 3000, position: 'bottom-right' });
	}

	return (
		<main className="flex flex-col items-center mx-2 my-8 max-w-[75vw]" >
			<h1 className="text-5xl font-bold text-center mb-12">Codificação de Huffman</h1>
			<div className="flex flex-col gap-12 items-center">
				<form onSubmit={encodeHandler} className="flex flex-col gap-6 items-center">
					<h2 className="text-3xl text-center mb-4">Codificação</h2>
					<textarea
						onChange={(e) => setToEncodeData(e.target.value)}
						className="p-4 min-w-[50vw] resize-none bg-gray-400/40 dark:bg-stone-800 dark:placeholder:text-sky-50/40 rounded-md"
						placeholder="Digite aqui o texto a ser codificado..."
						required
					/>
					<button type="submit" className="bg-[#213547] text-white dark:bg-zinc-800 min-w-24 max-w-48">Codificar</button>
				</form>
				{encodedJSON !== "" && (
					<div className="flex flex-col gap-2 max-w-[40vw]">
						<h3 className="text-xl text-center">Texto Codificado em Formato JSON</h3>
						<p
							onClick={copyToClipBoardJSONHandler}
							className="break-all dark:bg-stone-600/40 bg-gray-200 text-center p-2 rounded-md select-none cursor-pointer min-w-[20vw]"
						>
							{encodedJSON}
						</p>
					</div>
				)}
				<form onSubmit={decodeHandler} className="flex flex-col gap-6 items-center">
					<h2 className="text-3xl text-center mb-4">Decodificação</h2>
					<textarea
						onChange={(e) => setToDecodeJSON(e.target.value)}
						className="p-4 min-w-[50vw] resize-none bg-gray-400/40 dark:bg-stone-800 dark:placeholder:text-sky-50/40 rounded-md"
						placeholder="Digite aqui o texto a ser decodificado..."
						required
					/>
					<button type="submit" className="bg-[#213547] text-white dark:bg-zinc-800 min-w-32 max-w-48">Decodificar</button>
				</form>
				{decodedData !== "" && (
					<div className="flex flex-col gap-2 max-w-[40vw]">
						<h3 className="text-xl text-center">Texto Decodificado</h3>
						<p
							onClick={copyToClipBoardDataHandler}
							className="break-all dark:bg-stone-600/40 bg-gray-200 text-center p-2 rounded-md select-none cursor-pointer min-w-[20vw]"
						>
							{decodedData}
						</p>
					</div>
				)}
			</div>
		</main>
	)
}

export default App;