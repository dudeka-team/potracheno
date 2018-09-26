import React from 'react';
import FlexContainer from '../flex-container';

export default function HintPopup(props) {
	return (
		<div className="hint-popup">
			<div
				className="hint-popup__close-button"
				onClick={props.closeHintPopup}
			/>
			<FlexContainer fullHeight justifyContent="center" alignItems="center">
				<div className="hint-popup__content">
					<div className="hint-popup__icon-wrapper">
						<div className="hint-popup__icon" />
					</div>
					<div
						className="hint-popup__text"
						dangerouslySetInnerHTML={{ __html: props.text }}
					/>
					<div
						className="hint-popup__bottom-text"
						onClick={props.closeHintPopup}
					>
						{props.bottomText}
					</div>
				</div>
			</FlexContainer>
		</div>
	);
}
