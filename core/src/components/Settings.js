/**
 * Meta Setup.
 */
import { useState } from 'react';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { Modal } from '@wordpress/components';
const { __ } = wp.i18n;

import Icons from '@Editor/components/Icons';
import { ColorPicker, SocialConnection } from '@Editor/components/controls';

const GlobalMetaSetup = props => {

	const [ isOpenColorModal, setColorModalOpen ] = useState( false );
	const openColorModal = () => setColorModalOpen( true );
	const closeColorModal = () => setColorModalOpen( false );

	const [ isOpenTypoModal, setTypoModalOpen ] = useState( false );
	const openTypoModal = () => setTypoModalOpen( true );
	const closeTypoModal = () => setTypoModalOpen( false );

	const [ isOpenSpacingModal, setSpacingModalOpen ] = useState( false );
	const openSpacingModal = () => setSpacingModalOpen( true );
	const closeSpacingModal = () => setSpacingModalOpen( false );

	const colorSettings = {
		'gbs-meta-text-color': __( 'Text Color', 'gbs' ),
		'gbs-meta-link-color': __( 'Link Color', 'gbs' ),
		'gbs-meta-link-hover-color': __( 'Link Hover Color', 'gbs' ),
		'gbs-meta-content-background-color': __( 'Content Background', 'gbs' ),
		'gbs-meta-headings-color': __( 'Headings Color (H1-H6)', 'gbs' ),
		'gbs-meta-h1-heading-color': __( 'H1 Heding Color', 'gbs' ),
		'gbs-meta-h2-heading-color': __( 'H2 Heding Color', 'gbs' ),
		'gbs-meta-h3-heading-color': __( 'H3 Heding Color', 'gbs' ),
		'gbs-meta-h4-heading-color': __( 'H4 Heding Color', 'gbs' ),
		'gbs-meta-h5-heading-color': __( 'H5 Heding Color', 'gbs' ),
		'gbs-meta-h6-heading-color': __( 'H6 Heding Color', 'gbs' )
	};

	const colorModalSettings = Object.entries( colorSettings ).map( ( [ key, value ] ) => {
		return (
			<tr className="gbs-meta-setting-row" key={key}>
				<td className="gbs-meta-setting-row-heading">
					<label> { value }</label>
				</td>
				<td className="gbs-meta-setting-row-content">
					<section className="components-base-control__field">
						<ColorPicker
							id={ key }
							name={ key }
							value={ ( undefined !== props.meta[key] && ''!== props.meta[key] ? props.meta[key] : '' ) }
							onChange={ ( val ) => {
								props.setMetaFieldValue( val, key );
							} }
						/>
					</section>
				</td>
			</tr>
		);
	} );

	const modalFooter = () => {
		return (
			<>
				<div className="gbs-metabox-footer-container">
					<div className="gbs-button-container">
						<span className="gbs-meta-popup-notice">
							<i className='dashicons dashicons-warning'></i>
							{ __( 'Make sure to update your post for changes to take effect.', 'gbs' ) } </span>
						<button className="button button-default" onClick= { closeColorModal }> { __( 'Return To Post', 'gbs' ) }</button>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<PluginSidebarMoreMenuItem
				target="theme-meta-panel"
				icon={ Icons.globe }
			>
				{ __( 'Global Block Settings', 'gbs' ) }
			</PluginSidebarMoreMenuItem>

			<PluginSidebar
				isPinnable={ true }
				icon={ Icons.globe }
				name="theme-meta-panel"
				title={ __( 'Global Block Settings', 'gbs' ) }
			>

				<div className="gbs-sidebar-container components-panel__body is-opened" id="gbs_meta_box">

					<p className='description' style={{ padding: "20px" }}>
						{ __( 'Showcase your WordPress blocks using following current page specific global settings.', 'gbs' ) }
					</p>

					<div className="gbs-metasetup-panel components-panel__body">
						<h2 className="components-panel__body-title">
							<button className="components-button components-panel__body-toggle" onClick = { openColorModal }>
								<span className="gbs-title-container">
									{ __( 'Color Settings', 'gbs' ) }
								</span>
								{ Icons.moreSettings }
							</button>
						</h2>
					</div>

					{ isOpenColorModal && (
						<Modal
							title={ __( 'Color Settings', 'gbs' ) }
							className = "gbs-settings-modal"
							shouldCloseOnClickOutside = { false }
							onRequestClose={ closeColorModal }
						>
							<div className="gbs-meta-settings-content">
								<table className="gbs-meta-settings-table widefat">
									<tbody>
										{ colorModalSettings }
									</tbody>
								</table>
							</div>
							{ modalFooter() }
						</Modal>
					) }

					<div className="gbs-metasetup-panel components-panel__body">
						<h2 className="components-panel__body-title">
							<button className="components-button components-panel__body-toggle" onClick = { openTypoModal }>
								<span className="gbs-title-container">
									{ __( 'Typography Settings', 'gbs' ) }
								</span>
								{ Icons.moreSettings }
							</button>
						</h2>
					</div>

					{ isOpenTypoModal && (
						<Modal
							title={ __( 'Typogrphy Settings', 'gbs' ) }
							className = "gbs-settings-modal"
							shouldCloseOnClickOutside = { false }
							onRequestClose={ closeTypoModal }
						>
							<div className="gbs-meta-settings-content">
								<table className="gbs-meta-settings-table widefat">
									<tbody>
										{ colorModalSettings }
									</tbody>
								</table>
							</div>
							{ modalFooter() }
						</Modal>
					) }

					<div className="gbs-metasetup-panel components-panel__body">
						<h2 className="components-panel__body-title">
							<button className="components-button components-panel__body-toggle" onClick = { openSpacingModal }>
								<span className="gbs-title-container">
									{ __( 'Spacing Settings', 'gbs' ) }
								</span>
								{ Icons.moreSettings }
							</button>
						</h2>
					</div>

					{ isOpenSpacingModal && (
						<Modal
							title={ __( 'Spacing Settings', 'gbs' ) }
							className = "gbs-settings-modal"
							shouldCloseOnClickOutside = { false }
							onRequestClose={ closeSpacingModal }
						>
							<div className="gbs-meta-settings-content">
								<table className="gbs-meta-settings-table widefat">
									<tbody>
										{ colorModalSettings }
									</tbody>
								</table>
							</div>
							{ modalFooter() }
						</Modal>
					) }

					<SocialConnection/>

				</div>
			</PluginSidebar>
		</>
	);
}

export default compose (
	withSelect( ( select ) => {
		const postMeta = select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		const oldPostMeta = select( 'core/editor' ).getCurrentPostAttribute( 'meta' );
		return {
			meta: { ...oldPostMeta, ...postMeta },
			oldMeta: oldPostMeta,
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		setMetaFieldValue: ( value, field ) => dispatch( 'core/editor' ).editPost(
			{ meta: { [ field ]: value } }
		),
	} ) ),
) ( GlobalMetaSetup );
