import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './checkbox.css';

export default class Checkbox extends PureComponent {
	componentDidMount() {
		if (this.props.indeterminate) {
			this.setIndeterminateState();
		}
	}

	componentDidUpdate(prevProps) {
		const { indeterminate } = this.props;

		if (!prevProps.indeterminate && indeterminate) {
			this.setIndeterminateState();
		} else if (prevProps.indeterminate && !indeterminate) {
			this.unsetIndeterminateState();
		}
	}

	setIndeterminateState() {
		this.inputNode.indeterminate = true;
	}

	unsetIndeterminateState() {
		this.inputNode.indeterminate = false;
	}

	render() {
		const {
			className,
			...inputProps
		} = this.props;

		return (
			<div className={classNames(styles.root, className)}>
				<input
					className={styles.input}
					type="checkbox"
					ref={(node) => (this.inputNode = node)}
					{...inputProps}
				/>

				<span className={styles.checkbox} />
			</div>
		);
	}
}
