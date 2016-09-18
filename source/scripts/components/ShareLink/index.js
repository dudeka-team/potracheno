import React from 'react';


export default React.createClass({
	handleCopy() {
		const {props} = this;
		const range = document.createRange();
		const selection = window.getSelection();
		selection.removeAllRanges();

		range.selectNode(this.linkEl);
		selection.addRange(range);

		if (document.execCommand('copy')) {
			// eslint-disable-next-line max-len
			props.onCopy(true);
			selection.removeAllRanges();
		} else {
			props.onCopy(false);
		}
	},

	render() {
		const {props} = this;
		// eslint-disable-next-line max-len
		const annotation = 'Поделитесь ссылкой на мероприятие со своими друзьями, чтобы они могли присоединиться и вести учёт покупок вместе с вами:';

		return (
			<div className="share-event">
				<p className="share-event__annotation">{annotation}</p>
				<div className="share-event__link-wrapper">
					<div
						className="share-event__link"
						ref={(linkEl) => (this.linkEl = linkEl)}
					>{props.link}</div>
				</div>
				<div className="share-event__copy" onClick={this.handleCopy}>Скопировать ссылку</div>
			</div>
		);
	},
});
