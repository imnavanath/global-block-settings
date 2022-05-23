import { RangeControl, Dashicon } from '@wordpress/components';
import { useEffect, useState } from 'react';
import './ResponsiveSlider.scss';

function ResponsiveSlider( props ) {

	const { name, value, suffix, input_attrs = {}, description = '', label = '' } = props;

	const [state, setState] = useState( value );
	const [activeDevice, setActiveDevice] = useState( 'desktop' );

	useEffect( () => {
		// If settings are changed externally.
		if( state !== value ) {
			setState(value);
		}
	}, [props]);

	const updateValues = ( device, newVal ) => {
		let updateState = { ...state };
		updateState[ device ] = newVal;
		props.onChange( updateState );
		setState( updateState );
	};

	const renderInputHtml = ( device ) => {

		const input_attrs_selected = input_attrs && ( input_attrs.min || input_attrs.max || input_attrs.step ) ? input_attrs : input_attrs ? input_attrs[state[`${device}-unit`]] : '';

		const defaults = { min: 0, max: 500, step: 1 };

		const controlProps = {
			...defaults,
			...( input_attrs_selected || {} ),
		};

		const { min, max, step } = controlProps;

		let savedValue = ( state[device] || 0 === state[device] ) ? parseFloat( state[device] ) : '',
			isActive = device == activeDevice ? 'active' : '';

		if ( 1 === step ) {
			savedValue = ( state[device] || 0 === state[device] ) ? parseInt( state[device] ) : '';
		}

		return <div className={`gbs--responsive-input-field-wrapper ${device} ${isActive}`}>
			<RangeControl
				name={ name }
				resetFallbackValue={ '' }
				value={ savedValue }
				min={ min < 0 ? min : 0 }
				max={ max || 100 }
				step={ step || 1 }
				onChange={ ( newVal ) => { updateValues( device, newVal ) } }
			/>
		</div>;
	};

	let labelHtml = null,
		responsiveHtml = null,
		suffixHtml = null,
		descriptionHtml = null,
		inputHtml = null,
		unitHtml = null;

	if ( label ) {
		labelHtml = <h2 className='edit-post-preferences-modal__section-title gbs-typo-setting-heading'> { label } </h2>;
		responsiveHtml = <ul key={'gbs--resp-ul'} className="gbs--responsive-slider-btns">
			{ 'desktop' === activeDevice &&
				<li className={ `${'desktop' === activeDevice ? 'desktop active' : 'desktop'}` }>
					<button type="button" onClick={() => setActiveDevice( 'tablet' )} className="preview-desktop active" data-device="desktop">
						<Dashicon icon='desktop'/>
					</button>
				</li>
			}
			{ 'tablet' === activeDevice &&
				<li className={ `${'tablet' === activeDevice ? 'tablet active' : 'tablet'}` }>
					<button type="button" onClick={() => setActiveDevice( 'mobile' )} className="preview-tablet" data-device="tablet">
						<Dashicon icon='tablet'/>
					</button>
				</li>
			}
			{ 'mobile' === activeDevice &&
				<li className={ `${'mobile' === activeDevice ? 'mobile active' : 'mobile'}` }>
					<button type="button" onClick={() => setActiveDevice( 'desktop' )} className="preview-mobile" data-device="mobile">
						<Dashicon icon='smartphone'/>
					</button>
				</li>
			}
		</ul>;
	}

	if ( description ) {
		descriptionHtml = <span className="description">{ description }</span>;
	}

	if ( suffix && ! Array.isArray( suffix ) ) {
		suffixHtml = <span className="gbs--field-range-unit">{ suffix }</span>;
	}

	inputHtml = <>
		{ 'desktop' === activeDevice &&
			renderInputHtml( 'desktop' )
		}
		{ 'tablet' === activeDevice &&
			renderInputHtml( 'tablet' )
		}
		{ 'mobile' === activeDevice &&
			renderInputHtml( 'mobile' )
		}
	</>;

	return <div className="gbs--responsive-slider-field">
		<div className="gbs--field-slider-wrap">
			<label>
				{ labelHtml }
			</label>
			{ responsiveHtml }
			{ unitHtml }
			{ descriptionHtml }
			<div className="wrapper">
				{ inputHtml }
				{ suffixHtml }
			</div>
		</div>
	</div>;
};

export default ResponsiveSlider;
