function frequencyMap(text: string): [string, number][] {
	let frequencyObject: Map<string, number> = new Map();

	for(let i = 0; i < text.length; i++) {
		frequencyObject.set(text.charAt(i), (frequencyObject.get(text.charAt(i)) ?? 0) + 1);
	}

	return Array.from(frequencyObject.entries());
}

class HuffmanNode {
	freq: number;
	symbol: string;
	left: HuffmanNode | null;
	right: HuffmanNode | null;

	constructor(freq: number, symbol: string, left: HuffmanNode | null = null, right: HuffmanNode | null = null) {
		this.freq = freq;
		this.symbol = symbol;
		this.left = left;
		this.right = right;
	}
}

// Function used to build Huffman tree based on frequency map
function buildHuffmanTree(frequencies: [string, number][]): HuffmanNode {
	const nodes: HuffmanNode[] = frequencies.map(frequency => new HuffmanNode(frequency[1], frequency[0]))

	while(nodes.length > 1) {
		nodes.sort((a, b) => a.freq - b.freq);

		const left = nodes.shift()!;
		const right = nodes.shift()!;

		const newNode = new HuffmanNode(left.freq + right.freq, left.symbol + right.symbol, left, right);

		nodes.push(newNode);
	}

	return nodes[0];
}

// Function used to generate the path binary code for tree
function generateHuffmanCodes(node: HuffmanNode, code: string = '', codes: Map<string, string> = new Map()): Map<string, string> {
	if(node.left === null && node.right === null) {
		codes.set(node.symbol, code);
	}

	if(node.left)
		generateHuffmanCodes(node.left, code + '0', codes);
	if(node.right)
		generateHuffmanCodes(node.right, code + '1', codes);

	return codes;
}

type responseJson = {
	encoded: string,
	freqMapEntries: [string, number][]
}

// Main function used to encode data
export function huffmanEncoding(data: string): string {
	const frequencies = frequencyMap(data);
	const huffmanTree = buildHuffmanTree(frequencies);
	const huffmanCodes = generateHuffmanCodes(huffmanTree);

	const response: responseJson = {
		encoded: data.split('').map(char => huffmanCodes.get(char)).join(''),
		freqMapEntries: frequencies
	}

	return JSON.stringify(response);
}