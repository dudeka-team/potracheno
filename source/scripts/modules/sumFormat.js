export default function sumFormat(sum) {
	const arr = [];
	sum
		.toString()
		.split('')
		.reverse()
		.forEach((item, i) => {
			if ((i !== 0) && (i % 3 === 0)) {
				arr.push(`${item} `);
			} else {
				arr.push(item);
			}
		});
	return arr
			.reverse()
			.join('');
}
