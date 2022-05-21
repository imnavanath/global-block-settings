/**
 * Personal Social Connection Component.
 */

const { __ } = wp.i18n;
import Icons from '@Editor/components/Icons';

const SocialConnections = () => (
	<>
		<p className='gbs-connect-me' style={{ padding: "16px 16px 10px" }}>
			{ __( 'Connect with me:', 'gbs' ) }
		</p>
		<p className='gbs-social-links-wrap'>
			<a href="https://profiles.wordpress.org/navanathbhosale" title={ __( 'WordPress', 'gbs' ) } target="_blank" id="wordpress">
				{ Icons.wordpress }
			</a>
			<a href="https://github.com/imnavanath/global-block-settings" title={ __( 'GitHub', 'gbs' ) } target="_blank" id="github">
				{ Icons.github }
			</a>
			<a href="https://www.linkedin.com/in/navanath-bhosale" title={ __( 'Connect via LinkedIn', 'gbs' ) } target="_blank" id="linkedin">
				{ Icons.linkedin }
			</a>
			<a href="mailto:navanath.bhosale95@gmail.com" title={ __( 'Email me', 'gbs' ) } target="_blank" id="email">
				{ Icons.email }
			</a>
			<a href="https://www.paypal.com/paypalme/NavanathBhosale" title={ __( 'Donation link', 'gbs' ) } target="_blank" id="paypal">
				{ Icons.paypal }
			</a>
		</p>
	</>
)

export default SocialConnections;
