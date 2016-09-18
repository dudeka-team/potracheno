export default function sumFormat(sum) {
	return sum
		.toString()
		.split('')
		.reverse()
		.map((char, index) => {
			let result = char;
			if (index !== 0 && index % 3 === 0) {
				result += ' ';
			}
			return result;
		})
		.reverse()
		.join('');
}
