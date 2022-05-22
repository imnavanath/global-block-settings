<?php
/**
 * Plugin Loader.
 *
 * @package Global_Block_Settings
 * @since 1.0.0
 */

namespace GBS\Core;

use GBS\Core\Font_Base;
use GBS\Core\Traits\Get_Instance;

/**
 * Editor_Init
 *
 * @since 1.0.0
 */
class Editor_Init {

	use Get_Instance;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ], 9 );
	}

	/**
	 * Enqueue editor assets.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function enqueue_block_editor_assets() {

		$version           = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? time() : GBS_VER;
		$script_asset_path = GBS_DIR . 'assets/editor.asset.php';
		$script_info       = file_exists( $script_asset_path ) ? include $script_asset_path : array(
			'dependencies' => [],
			'version'      => $version,
		);
		$script_deps       = $script_info['dependencies'];

		wp_enqueue_script(
			'gbs-global-build',
			GBS_URL . 'assets/editor.js',
			$script_deps,
			$version,
			true
		);

		$localize = apply_filters(
			'gbs_localized_vars',
			array(
				'font_family'                     => Font_Base::get_font_family(),
				'google_fonts'                    => Font_Base::get_google_fonts(),
				'system_fonts'                    => Font_Base::get_system_fonts(),
				'font_weights'                    => array(
					'100' => __( 'Thin 100', 'gbs' ),
					'200' => __( 'Extra-Light 200', 'gbs' ),
					'300' => __( 'Light 300', 'gbs' ),
					'400' => __( 'Normal 400', 'gbs' ),
					'500' => __( 'Medium 500', 'gbs' ),
					'600' => __( 'Semi-Bold 600', 'gbs' ),
					'700' => __( 'Bold 700', 'gbs' ),
					'800' => __( 'Extra-Bold 800', 'gbs' ),
					'900' => __( 'Ultra-Bold 900', 'gbs' ),
				),
			)
		);

		wp_localize_script( 'gbs-global-build', 'gbs_editor', $localize );

		wp_enqueue_style( 'gbs-global-build', GBS_URL . 'assets/editor.css', [], $version );
	}
}
