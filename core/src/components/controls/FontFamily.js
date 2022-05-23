import React, { useState } from 'react';
import {SelectField} from '@Editor/components/controls';
import AsyncSelect from 'react-select/async';
import './FontFamily.scss';
import './Select2Field.scss';

function FontFamily( props ) {
	const {
		name,
		value,
		label,
		font_weight_name = '',
		font_weight_value = '',
	} = props;

	const font_family = gbs_editor.font_family;

	const default_value = ! value ? 'Default' : value;

	const [ selectedValue, setSelectedValue ] = useState( {
		value,
		label:
			value && value.match( /'([^']+)'/ )
				? value.match( /'([^']+)'/ )[ 1 ]
				: default_value,
	} );

	const [ weightvalue, setWeight ] = useState( font_weight_value );

	const filterFont = ( inputValue ) => {
		const system_fonts = font_family[ 1 ].options,
			google_font = font_family[ 2 ].options,
			default_font = font_family[ 0 ],
			fonts = system_fonts.concat( google_font, default_font );

		return fonts.filter( ( i ) =>
			i.label.toLowerCase().includes( inputValue.toLowerCase() )
		);
	};

	const prepareweightList = function ( currentValue ) {
		let font_family = currentValue.value;

		const weight = [];

		if ( 'undefined' === typeof font_family || '' === font_family ) {
			weight.push( { value: '', label: 'Default' } );
			return weight;
		}

		const temp = font_family.match( "'(.*)'" );

		const google_font_families = {};

		if ( temp && temp[ 1 ] ) {
			font_family = temp[ 1 ];
		}

		const new_font_weights = {};

		if ( gbs_editor.google_fonts[ font_family ] ) {
			const google_fonts_variants =
				gbs_editor.google_fonts[ font_family ].variants;

			google_fonts_variants.map( ( index ) => {
				if ( ! index.includes( 'italic' ) ) {
					new_font_weights[ index ] =
						gbs_editor.font_weights[ index ];
				}
				return '';
			} );

			Object.keys( new_font_weights ).map( ( val ) => {
				const value1 = new_font_weights[ val ];
				weight.push( { value: val, label: value1 } );
				return '';
			} );

			const temp_font_family = font_family.replace( ' ', '+' );
			google_font_families[ temp_font_family ] = new_font_weights;
		} else if ( gbs_editor.system_fonts[ font_family ] ) {
			const system_font_variants =
				gbs_editor.system_fonts[ font_family ].variants;

			system_font_variants.map( ( index ) => {
				if ( ! index.includes( 'italic' ) ) {
					new_font_weights[ index ] =
						gbs_editor.font_weights[ index ];
				}
				return '';
			} );

			Object.keys( new_font_weights ).map( ( val ) => {
				const value1 = new_font_weights[ val ];
				weight.push( { value: val, label: value1 } );
				return '';
			} );
		}

		return weight;
	};

	const handleChange = ( currentValue ) => {
		setSelectedValue( currentValue );
		props.onChange( currentValue );

		const new_weight_list = prepareweightList( currentValue );

		weightList = new_weight_list;
	};

	const loadOptions = ( inputValue ) => {
		return new Promise( ( resolve ) => {
			setTimeout( () => {
				resolve( filterFont( inputValue ) );
			}, 1000 );
		} );
	};

	const setWeightValue = function ( val ) {
		setWeight( val );
		props.onChange( val );
	};

	let weightList = prepareweightList( selectedValue );

	return (
		<div className="gbs-font-family-field">
			<h2 className='edit-post-preferences-modal__section-title gbs-typo-setting-heading'> { label } </h2>
			<div className="gbs-selection-field">
				<AsyncSelect
					name={ name }
					className="gbs-select2-input"
					classNamePrefix="gbs"
					cacheOptions
					defaultOptions={ font_family }
					value={ selectedValue }
					loadOptions={ loadOptions }
					onChange={ handleChange }
				/>
			</div>

			{ '' !== font_weight_name && (
				<div className="gbs-font-weight-field">
					<SelectField
						name={ font_weight_name }
						className="gbs-select-input"
						value={ weightvalue }
						onChange={ setWeightValue }
						options={ weightList }
					/>
				</div>
			) }
		</div>
	);
}

export default FontFamily;
