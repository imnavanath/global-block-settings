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
import SocialConnnection from '@Editor/components/SocialConnections';

const GlobalMetaSetup = props => {

	const [ isOpenColorModal, setColorModalOpen ] = useState( false );

	const openColorModal = () => setColorModalOpen( true );
	const closeColorModal = () => setColorModalOpen( false );

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
						{ __( 'Showcase your editor blocks using the following page specific global settings.', 'gbs' ) }
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

					<div className="gbs-metasetup-panel components-panel__body">
						<h2 className="components-panel__body-title">
							<button className="components-button components-panel__body-toggle" onClick = { openColorModal }>
								<span className="gbs-title-container">
									{ __( 'Typography Settings', 'gbs' ) }
								</span>
								{ Icons.moreSettings }
							</button>
						</h2>
					</div>

					<div className="gbs-metasetup-panel components-panel__body">
						<h2 className="components-panel__body-title">
							<button className="components-button components-panel__body-toggle" onClick = { openColorModal }>
								<span className="gbs-title-container">
									{ __( 'Spacing Settings', 'gbs' ) }
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
							icon={ Icons.wordpress }
						>
							<div className="gbs-meta-settings-content">
								<table className="gbs-meta-settings-table widefat">
									<tbody>
										<tr className="gbs-meta-setting-row">
											<td className="gbs-meta-setting-row-heading">
												<label> { __( 'Field 1', 'gbs' ) }</label>
											</td>
											<td className="gbs-meta-setting-row-content">
												<section className="components-base-control__field">
													Control 1
												</section>
											</td>
										</tr>
										<tr className="gbs-meta-setting-row">
											<td className="gbs-meta-setting-row-heading">
												<label> Field 2 </label>
											</td>
											<td className="gbs-meta-setting-row-content">
												<section>
													<div className="components-base-control__field">
														Control 2
													</div>
												</section>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							{ modalFooter() }
						</Modal>
					) }

					<SocialConnnection/>

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
