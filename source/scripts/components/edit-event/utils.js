import shortid from 'shortid';

export function createParticipant(name = '') {
	return {
		name,
		id: shortid.generate(),
	};
}

export function keepOneEmptyItem(participants) {
	const result = participants.slice();

	if (result.filter(({ name }) => !name).length === 0) {
		result.push(createParticipant());
	}

	return result;
}

export function markDuplicateParticipants(additionalNames) {
	const names = {};

	additionalNames.forEach(name => {
		names[name.toLowerCase()] = 1;
	});

	return item => {
		const name = item.name.toLowerCase();
		const isDuplicate = !!names[name];

		if (!name.trim()) return item;

		const result = { ...item, isDuplicate };

		if (!isDuplicate) {
			names[name] = 1;
		}

		return result;
	};
}
