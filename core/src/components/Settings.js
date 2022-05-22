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
import { ColorPicker, SocialConnection, FontFamily } from '@Editor/components/controls';

const GlobalMetaSetup = props => {

	const [ isOpenColorModal, setColorModalOpen ] = useState( false );
	const openColorModal = () => setColorModalOpen( true );
	const closeColorModal = () => setColorModalOpen( false );

	const [ typoActiveTab, settypoActiveTab ] = useState( 'text' );

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

	const typoModalSettings = ( setting ) => {
		return (
			<div role="tabpanel" id={ `tab-panel-${ setting }-view` } className="components-tab-panel__tab-content">
				<section className="edit-post-preferences-modal__section">
					<h2 className='edit-post-preferences-modal__section-title gbs-typo-setting-heading'> {__( 'Font', 'gbs' )} </h2>
					<section className="components-base-control__field">
						<FontFamily
							id={ `gbs-meta-${ setting }-font-family` }
							name={ `gbs-meta-${ setting }-font-family` }
							value={ ( undefined !== props.meta[`gbs-meta-${ setting }-font-family`] && ''!== props.meta[`gbs-meta-${ setting }-font-family`] ? props.meta[`gbs-meta-${ setting }-font-family`] : '' ) }
							font_weight_name={
								`gbs-meta-${ setting }-font-weight`
							}
							font_weight_value={
								( undefined !== props.meta[`gbs-meta-${ setting }-font-weight`] && ''!== props.meta[`gbs-meta-${ setting }-font-weight`] ? props.meta[`gbs-meta-${ setting }-font-weight`] : '' )
							}
						/>
					</section>
				</section>
			</div>
		);
	};

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
							<div className='edit-post-preferences-modal'>
								<div className='edit-post-preferences__tabs'>
									<div role="tablist" aria-orientation="vertical" className="components-tab-panel__tabs">
										<button
											className={ `${
												'text' === typoActiveTab
													? 'components-button components-tab-panel__tabs-item is-active'
													: 'components-button components-tab-panel__tabs-item'
											}` }
											onClick={ () => {
												settypoActiveTab( 'text' );
											} }
										>
											{ __( 'Text', 'gbs' ) }
										</button>
										<button
											className={ `${
												'link' === typoActiveTab
													? 'components-button components-tab-panel__tabs-item is-active'
													: 'components-button components-tab-panel__tabs-item'
											}` }
											onClick={ () => {
												settypoActiveTab( 'link' );
											} }
										>
											{ __( 'Link', 'gbs' ) }
										</button>
										<button
											className={ `${
												'headings' === typoActiveTab
													? 'components-button components-tab-panel__tabs-item is-active'
													: 'components-button components-tab-panel__tabs-item'
											}` }
											onClick={ () => {
												settypoActiveTab( 'headings' );
											} }
										>
											{ __( 'Headings (H1-H6)', 'gbs' ) }
										</button>
										<button
											className={ `${
												'h1-heading' === typoActiveTab
													? 'components-button components-tab-panel__tabs-item is-active'
													: 'components-button components-tab-panel__tabs-item'
											}` }
											onClick={ () => {
												settypoActiveTab( 'h1-heading' );
											} }
										>
											{ __( 'H1 Heading', 'gbs' ) }
										</button>
										<button
											className={ `${
												'h2-heading' === typoActiveTab
													? 'components-button components-tab-panel__tabs-item is-active'
													: 'components-button components-tab-panel__tabs-item'
											}` }
											onClick={ () => {
												settypoActiveTab( 'h2-heading' );
											} }
										>
											{ __( 'H2 Heading', 'gbs' ) }
										</button>
										<button
											className={ `${
												'h3-heading' === typoActiveTab
													? 'components-button components-tab-panel__tabs-item is-active'
													: 'components-button components-tab-panel__tabs-item'
											}` }
											onClick={ () => {
												settypoActiveTab( 'h3-heading' );
											} }
										>
											{ __( 'H3 Heading', 'gbs' ) }
										</button>
										<button
											className={ `${
												'h4-heading' === typoActiveTab
													? 'components-button components-tab-panel__tabs-item is-active'
													: 'components-button components-tab-panel__tabs-item'
											}` }
											onClick={ () => {
												settypoActiveTab( 'h4-heading' );
											} }
										>
											{ __( 'H4 Heading', 'gbs' ) }
										</button>
										<button
											className={ `${
												'h5-heading' === typoActiveTab
													? 'components-button components-tab-panel__tabs-item is-active'
													: 'components-button components-tab-panel__tabs-item'
											}` }
											onClick={ () => {
												settypoActiveTab( 'h5-heading' );
											} }
										>
											{ __( 'H5 Heading', 'gbs' ) }
										</button>
										<button
											className={ `${
												'h6-heading' === typoActiveTab
													? 'components-button components-tab-panel__tabs-item is-active'
													: 'components-button components-tab-panel__tabs-item'
											}` }
											onClick={ () => {
												settypoActiveTab( 'h6-heading' );
											} }
										>
											{ __( 'H6 Heading', 'gbs' ) }
										</button>
									</div>

									{ 'text' === typoActiveTab &&
										typoModalSettings( 'text' )
									}

									{ 'link' === typoActiveTab &&
										typoModalSettings( 'link' )
									}

									{ 'headings' === typoActiveTab &&
										typoModalSettings( 'headings' )
									}

									{ 'h1-heading' === typoActiveTab &&
										typoModalSettings( 'h1-heading' )
									}

									{ 'h2-heading' === typoActiveTab &&
										typoModalSettings( 'h2-heading' )
									}

									{ 'h3-heading' === typoActiveTab &&
										typoModalSettings( 'h3-heading' )
									}

									{ 'h4-heading' === typoActiveTab &&
										typoModalSettings( 'h4-heading' )
									}

									{ 'h5-heading' === typoActiveTab &&
										typoModalSettings( 'h5-heading' )
									}

									{ 'h6-heading' === typoActiveTab &&
										typoModalSettings( 'h6-heading' )
									}

								</div>
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
