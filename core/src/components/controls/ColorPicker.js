import React, { useState } from 'react';
import reactCSS from 'reactcss';
import './ColorPicker.scss';
import { __ } from '@wordpress/i18n';
import { SketchPicker } from 'react-color';

function ColorPicker( props ) {
	const { name, value } = props;

	const [ displayColorPicker, setdisplayColorPicker ] = useState( false );
	const [ color, setColor ] = useState( value );

	const styles = reactCSS( {
		default: {
			color: {
				width: '40px',
				height: '30px',
				background: color,
			},
		},
	} );

	const handleClick = () => {
		setdisplayColorPicker( ( prevValue ) => ! prevValue );
	};
	const handleResetColor = () => {
		handleChange( '' );
	};

	const handleChange = ( newcolor ) => {
		if ( newcolor ) {
			setColor( newcolor.hex );
			props.onChange( newcolor.hex );
		} else {
			setColor( newcolor );
			props.onChange( newcolor.hex );
		}
	};

	return (
		<div className="gbs--field gbs--color-field">
			<div className="gbs--field__data">
				<div className="gbs--field__data--content">
					<div className="gbs--colorpicker-selector">
						<div
							className="gbs--colorpicker-swatch-wrap"
							onClick={ handleClick }
						>
							<span
								className="gbs--colorpicker-swatch"
								style={ styles.color }
							/>
							<span className="gbs--colorpicker-label">
								{ __( 'Select Color', 'gbs' ) }
							</span>
							<input
								type="hidden"
								name={ name }
								value={ color }
							/>
						</div>
						{ color && (
							<span
								className="gbs--colorpicker-reset"
								onClick={ handleResetColor }
								title={ __( 'Reset', 'gbs' ) }
							>
								<span className="dashicons dashicons-update-alt"></span>
							</span>
						) }
					</div>
					<div className="gbs--color-picker">
						{ displayColorPicker ? (
							<div className="gbs--color-picker-popover">
								<SketchPicker
									name={ name }
									color={ color }
									onChange={ handleChange }
								/>
							</div>
						) : null }
					</div>
				</div>
			</div>
		</div>
	);
}

export default ColorPicker;
