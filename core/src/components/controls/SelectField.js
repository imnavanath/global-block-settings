import React, { useState } from 'react';
import './SelectField.scss';

function SelectField( props ) {
	const {
		name,
		id,
		options,
		onSelect,
		prodata,
	} = props;

	const [ value, setValue ] = useState( props.value );

	function handleChange( e ) {
		setValue( e.target.value );

		if ( props?.callback ) {
			props.callback( e, props.name, e.target.value );
		}

		if ( onSelect ) {
			onSelect();
		}
	}

	return (
		<div className="gbs-field gbs-select-option">
			<div className="gbs-field__data">
				<div className="gbs-field__data--content">
					<select
						className={ props.class }
						name={ name }
						id={ id }
						value={ value }
						onChange={ handleChange }
					>
						{ options && options.map( ( option ) => {
								let option_label = option.label,
									disabled = false;

								if ( prodata && option.value in prodata ) {
									option_label = prodata[ option.value ];
									disabled = true;
								}

								return (
									<option
										key={ option.value }
										value={ option.value }
										disabled={ disabled }
									>
										{ option_label }
									</option>
								);
							} ) }
					</select>
				</div>
			</div>
		</div>
	);
}

export default SelectField;
