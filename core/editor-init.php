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
		add_action( 'init', [ $this, 'register_meta_settings' ] );
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
		$script_info       = file_exists( $script_asset_path ) ? include $script_asset_path : [
			'dependencies' => [],
			'version'      => $version,
		];
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
			[
				'font_family'  => Font_Base::get_font_family(),
				'google_fonts' => Font_Base::get_google_fonts(),
				'system_fonts' => Font_Base::get_system_fonts(),
				'font_weights' => [
					'100' => __( 'Thin 100', 'gbs' ),
					'200' => __( 'Extra-Light 200', 'gbs' ),
					'300' => __( 'Light 300', 'gbs' ),
					'400' => __( 'Normal 400', 'gbs' ),
					'500' => __( 'Medium 500', 'gbs' ),
					'600' => __( 'Semi-Bold 600', 'gbs' ),
					'700' => __( 'Bold 700', 'gbs' ),
					'800' => __( 'Extra-Bold 800', 'gbs' ),
					'900' => __( 'Ultra-Bold 900', 'gbs' ),
				],
			]
		);

		wp_localize_script( 'gbs-global-build', 'gbs_editor', $localize );

		wp_enqueue_style( 'gbs-global-build', GBS_URL . 'assets/editor.css', [], $version );
	}

	/**
	 * Get Global Block Settings metabox options.
	 *
	 * @since x.x.x
	 */
	public static function get_meta_options() {
		// key : default.
		$gbs_meta_settings = apply_filters(
			'gbs_meta_settings',
			[
				'gbs-meta-text-color'                => '',
				'gbs-meta-link-color'                => '',
				'gbs-meta-link-hover-color'          => '',
				'gbs-meta-content-background-color'  => '',
				'gbs-meta-headings-color'            => '',
				'gbs-meta-h1-heading-color'          => '',
				'gbs-meta-h2-heading-color'          => '',
				'gbs-meta-h3-heading-color'          => '',
				'gbs-meta-h4-heading-color'          => '',
				'gbs-meta-h5-heading-color'          => '',
				'gbs-meta-h6-heading-color'          => '',
				'gbs-meta-text-font-family'          => '',
				'gbs-meta-text-font-weight'          => '',
				'gbs-meta-text-text-transform'       => '',
				'gbs-meta-text-font-size'            => [],
				'gbs-meta-text-line-height'          => [],
				'gbs-meta-link-font-family'          => '',
				'gbs-meta-link-font-weight'          => '',
				'gbs-meta-link-text-transform'       => '',
				'gbs-meta-link-font-size'            => [],
				'gbs-meta-link-line-height'          => [],
				'gbs-meta-headings-font-family'      => '',
				'gbs-meta-headings-font-weight'      => '',
				'gbs-meta-headings-text-transform'   => '',
				'gbs-meta-headings-font-size'        => [],
				'gbs-meta-headings-line-height'      => [],
				'gbs-meta-h1-heading-font-family'    => '',
				'gbs-meta-h1-heading-font-weight'    => '',
				'gbs-meta-h1-heading-text-transform' => '',
				'gbs-meta-h1-heading-font-size'      => [],
				'gbs-meta-h1-heading-line-height'    => [],
				'gbs-meta-h2-heading-font-family'    => '',
				'gbs-meta-h2-heading-font-weight'    => '',
				'gbs-meta-h2-heading-text-transform' => '',
				'gbs-meta-h2-heading-font-size'      => [],
				'gbs-meta-h2-heading-line-height'    => [],
				'gbs-meta-h3-heading-font-family'    => '',
				'gbs-meta-h3-heading-font-weight'    => '',
				'gbs-meta-h3-heading-text-transform' => '',
				'gbs-meta-h3-heading-font-size'      => [],
				'gbs-meta-h3-heading-line-height'    => [],
				'gbs-meta-h4-heading-font-family'    => '',
				'gbs-meta-h4-heading-font-weight'    => '',
				'gbs-meta-h4-heading-text-transform' => '',
				'gbs-meta-h4-heading-font-size'      => [],
				'gbs-meta-h4-heading-line-height'    => [],
				'gbs-meta-h5-heading-font-family'    => '',
				'gbs-meta-h5-heading-font-weight'    => '',
				'gbs-meta-h5-heading-text-transform' => '',
				'gbs-meta-h5-heading-font-size'      => [],
				'gbs-meta-h5-heading-line-height'    => [],
				'gbs-meta-h6-heading-font-family'    => '',
				'gbs-meta-h6-heading-font-weight'    => '',
				'gbs-meta-h6-heading-text-transform' => '',
				'gbs-meta-h6-heading-font-size'      => [],
				'gbs-meta-h6-heading-line-height'    => [],
			]
		);

		$processed_meta_array = [];
		foreach ( $gbs_meta_settings as $metakey => $default ) {
			$processed_meta_array[ $metakey ] = [
				'default'  => $default,
				'sanitize' => 'FILTER_DEFAULT',
			];
		}

		return $processed_meta_array;
	}

	/**
	 * Register Post Meta options for react based fields.
	 *
	 * @since x.x.x
	 */
	public function register_meta_settings() {
		$gbs_meta = self::get_meta_options();

		foreach ( $gbs_meta as $metakey => $metavalue ) {
			$type = ( strpos( $metakey, 'font-size' ) !== false || strpos( $metakey, 'line-height' ) !== false ) ? 'array' : 'string';
			register_post_meta(
				'',
				$metakey,
				[
					'show_in_rest'  => true,
					'single'        => true,
					'default'       => '',
					'type'          => 'string',
					'auth_callback' => '__return_true',
				]
			);
		}
	}
}
