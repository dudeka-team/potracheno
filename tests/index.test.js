test('Вы хотите сказать, что не написали ни одного автотеста?', () => {
	function answer() {
		return 'Нет';
	}

	expect(answer()).toBe('Нет');
});
