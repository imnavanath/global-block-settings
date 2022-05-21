<?php
/**
 * Helper.
 *
 * @package Global_Block_Settings
 * @since x.x.x
 */

namespace GBS\Core;

use GBS\Core\Traits\Get_Instance;

/**
 * Helper
 *
 * @since x.x.x
 */
class Helper {

	use Get_Instance;

	/**
	 * Keep default values of all settings.
	 *
	 * @var array
	 * @since x.x.x
	 */
	public function get_defaults() {
		$user           = wp_get_current_user();
		$site_user_name = $user->display_name;

		return [
			GBS_SETTINGS         => [
				'enable_width'          => true,
				'enable_custom_css'     => true,
				'enable_display'        => true,
				'enable_layout_options' => true,
				'enable_spacings'       => true,
				'enable_background'     => true,
				'enable_border'         => true,
				'enable_transform'      => true,
				'enable_motion_effects' => true,
			],
			GBS_SUPPORT_SETTINGS => [
				'name'     => ucfirst( $site_user_name ),
				'email'    => $user->user_email,
				'site_url' => '#',
			],
		];
	}

	/**
	 * Get option value from database and retruns value merged with default values
	 *
	 * @param string $option option name to get value from.
	 * @return array
	 * @since x.x.x
	 */
	public function get_post_meta( $option ) {
		$db_values = get_option( $option, [] );
		return wp_parse_args( $db_values, $this->get_defaults()[ $option ] );
	}
}
