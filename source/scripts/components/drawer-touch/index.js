import React from 'react';
import classNames from 'classnames';
import styles from './drawer.css';

export default class Drawer extends React.Component {

	static defaultProps = {
		swipeAreaWidth: 25,
		toggleInterval: 50,
		open: false,
	};

	state = {
		touchId: null,
		startX: null,
		startY: null,
		currentX: null,
		currentY: null,
	};

	getSidebarWidth = () => this.drawerWidth.offsetWidth;

	handleTouchStart = (event) => {
		if (!this.isTouching()) {
			const touch = event.targetTouches[0];
			this.setState({
				touchId: touch.identifier,
				startX: touch.clientX,
				startY: touch.clientY,
				currentX: touch.clientX,
				currentY: touch.clientY,
			});
		}
	}

	handleTouchMove = (event) => {
		if (this.isTouching()) {
			this.setState({
				currentX: event.targetTouches[0].clientX,
				currentY: event.targetTouches[0].clientY,
			});
		}
	}

	handleTouchEnd = () => {
		if (this.isTouching()) {
			const touchWidth = this.touchSidebarOffset();
			if (this.props.open && touchWidth < this.getSidebarWidth() - this.props.toggleInterval) {
				this.props.onClose();
			}
			if (!this.props.open && touchWidth > this.props.toggleInterval) {
				this.props.onOpen();
			}
			this.setState({
				touchId: null,
				startX: null,
				startY: null,
				currentX: null,
				currentY: null,
			});
		}
	}

	handleOverlayClick = () => {
		if (this.props.open) {
			this.props.onClose();
		}
	}

	touchSidebarOffset = () => {
		if (this.props.open && window.innerWidth - this.state.startX < this.getSidebarWidth()) {
			if (this.state.currentX > this.state.startX) {
				return (this.getSidebarWidth() + (this.state.startX - this.state.currentX));
			}
			return this.getSidebarWidth();
		}
		return Math.min(window.innerWidth - this.state.currentX, this.getSidebarWidth());
	}

	isTouching = () => this.state.touchId !== null;

	render() {
		const { children } = this.props;
		const rootProps = {};
		const dragArea = {};
		const stylesOfOverlay = {};
		const stylesOfSidebar = {};
		const dragAreaClass = classNames({
			[`${styles.dragArea}`]: true,
		});
		const stylesOfOverlayClass = classNames({
			[`${styles.drawerOverlay}`]: true,
		});
		const drawer = classNames({
			[`${styles.drawer}`]: true,
		});
		if (!this.props.open) {
			dragArea.width = this.props.swipeAreaWidth;
		} else {
			rootProps.onTouchStart = this.handleTouchStart;
			rootProps.onTouchMove = this.handleTouchMove;
			rootProps.onTouchEnd = this.handleTouchEnd;
			rootProps.onTouchCancel = this.handleTouchEnd;
		}

		if (this.isTouching()) {
			const currentRatio = this.touchSidebarOffset() / this.getSidebarWidth();
			stylesOfSidebar.transform = `translateX(${(1 - currentRatio) * 100}%)`;
			stylesOfSidebar.WebkitTransform = `translateX(${(1 - currentRatio) * 100}%)`;
			stylesOfOverlay.opacity = currentRatio;
			stylesOfOverlay.visibility = 'visible';
			stylesOfSidebar.transition = 'none';
			stylesOfSidebar.WebkitTransition = 'none';
			stylesOfOverlay.transition = 'none';
		} else if (this.props.open) {
			stylesOfSidebar.transform = 'translateX(0%)';
			stylesOfSidebar.WebkitTransform = 'translateX(0%)';
			stylesOfOverlay.opacity = 1;
			stylesOfOverlay.visibility = 'visible';
		}

		return (
			<div {...rootProps}>
				<div
					style={dragArea}
					className={dragAreaClass}
					onTouchStart={this.handleTouchStart}
					onTouchMove={this.handleTouchMove}
					onTouchEnd={this.handleTouchEnd}
					onTouchCancel={this.handleTouchEnd}
				/>
				<div style={stylesOfOverlay} className={stylesOfOverlayClass} onClick={this.handleOverlayClick} />
				<div className={drawer} style={stylesOfSidebar} ref={(c) => { this.drawerWidth = c; }}>
					{ children }
				</div>
			</div>
		);
	}
}
