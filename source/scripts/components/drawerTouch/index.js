import React from 'react';
import classNames from 'classnames';
import styles from './drawer.css';

const drawerStyles = {
	dragArea: {
		position: 'fixed',
		top: 0,
		bottom: 0,
		right: 0,
		zIndex: 1,
	},
	drawerOverlay: {
		zIndex: 1200,
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0,
		visibility: 'hidden',
		transition: 'opacity .3s ease-out, visibility .3s ease-out',
		backgroundColor: 'rgba(0,0,0,.54)',
	},
};

export default class Drawer extends React.Component {

	static defaultProps = {
		swipeAreaWidth: 25,
		toggleInterval: 50,
		open: false,
	};

	constructor(props) {
		super(props);
		this.state = {
			touchId: null,
			startX: null,
			startY: null,
			currentX: null,
			currentY: null,
			sidebarWidth: 256,
		};
	}

	onTouchStart = (e) => {
		if (!this.isTouching()) {
			const touch = e.targetTouches[0];
			this.setState({
				touchId: touch.identifier,
				startX: touch.clientX,
				startY: touch.clientY,
				currentX: touch.clientX,
				currentY: touch.clientY,
			});
		}
	}

	onTouchMove = (e) => {
		if (this.isTouching()) {
			this.setState({
				currentX: e.targetTouches[0].clientX,
				currentY: e.targetTouches[0].clientY,
			});
		}
	}

	onTouchEnd = () => {
		if (this.isTouching()) {
			const touchWidth = this.touchSidebarWidth();
			if (
				(this.props.open && touchWidth < this.state.sidebarWidth - this.props.toggleInterval)
				||
				(!this.props.open && touchWidth > this.props.toggleInterval)
			) {
				this.props.onRequestChange(!this.props.open);
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

	getDrawerClassName = () => classNames(styles.dragArea);

	overlayClick = () => {
		if (this.props.open) {
			this.props.onRequestChange(false);
		}
	}

	touchSidebarWidth = () => {
		if (this.props.open && window.innerWidth - this.state.startX < this.state.sidebarWidth) {
			if (this.state.currentX > this.state.startX) {
				return (this.state.sidebarWidth + (this.state.startX - this.state.currentX));
			}
			return this.state.sidebarWidth;
		}
		return Math.min(window.innerWidth - this.state.currentX, this.state.sidebarWidth);
	}

	isTouching = () => this.state.touchId !== null;

	render() {
		const { children } = this.props;
		const rootProps = {};
		const stylesOfSidebar = { ...drawerStyles.sidebar };
		const stylesOfOverlay = { ...drawerStyles.drawerOverlay };
		const rootClass = classNames({
			[`${styles.drawernone}`]: !this.props.open,
		});
		const drawer = classNames({
			[`${styles.drawer}`]: true,
		});
		const dragHandle = (
			<div
				style={drawerStyles.dragArea}
				onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}
				onTouchEnd={this.onTouchEnd} onTouchCancel={this.onTouchEnd}
			/>
		);

		if (!this.props.open) {
			drawerStyles.dragArea.width = this.props.swipeAreaWidth;
		} else {
			rootProps.onTouchStart = this.onTouchStart;
			rootProps.onTouchMove = this.onTouchMove;
			rootProps.onTouchEnd = this.onTouchEnd;
			rootProps.onTouchCancel = this.onTouchEnd;
			rootProps.onScroll = this.onScroll;
		}

		if (this.isTouching()) {
			const currentRatio = this.touchSidebarWidth() / this.state.sidebarWidth;
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
			<div className={rootClass} {...rootProps}>
				{ dragHandle }
				<div style={stylesOfOverlay} onClick={this.overlayClick} />
				<div className={drawer} style={stylesOfSidebar}>
					{ children }
				</div>
			</div>
		);
	}
}
