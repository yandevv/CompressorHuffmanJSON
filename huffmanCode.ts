function frequencyMap(text: string): [string, number][] {
	let frequencyObject: Map<string, number> = new Map();

	for(let i = 0; i < text.length; i++) {
		frequencyObject.set(text.charAt(i), (frequencyObject.get(text.charAt(i)) ?? 0) + 1);
	}

	return Array.from(frequencyObject.entries());
}