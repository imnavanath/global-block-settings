<?php
/**
 * Plugin Loader.
 *
 * @package Global_Block_Settings
 * @since 1.0.0
 */

namespace GBS;

/**
 * GBS_Loader
 *
 * @since 1.0.0
 */
class GBS_Loader {

	/**
	 * Instance
	 *
	 * @access private
	 * @var object Class Instance.
	 * @since 1.0.0
	 */
	private static $instance;

	/**
	 * Initiator
	 *
	 * @since 1.0.0
	 * @return object initialized object of class.
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 */
	public function __construct() {

		spl_autoload_register( [ $this, 'autoload' ] );

		add_action( 'plugins_loaded', [ $this, 'load_textdomain' ] );

		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ], 9 );
	}

	/**
	 * Autoload classes.
	 *
	 * @param string $class class name.
	 */
	public function autoload( $class ) {
		if ( 0 !== strpos( $class, __NAMESPACE__ ) ) {
			return;
		}

		$class_to_load = $class;

		$filename = strtolower(
			preg_replace(
				[ '/^' . __NAMESPACE__ . '\\\/', '/([a-z])([A-Z])/', '/_/', '/\\\/' ],
				[ '', '$1-$2', '-', DIRECTORY_SEPARATOR ],
				$class_to_load
			)
		);

		$file = GBS_DIR . $filename . '.php';

		// if the file redable, include it.
		if ( is_readable( $file ) ) {
			require_once $file;
		}
	}

	/**
	 * Load Plugin Text Domain.
	 * This will load the translation textdomain depending on the file priorities.
	 *      1. Global Languages /wp-content/languages/global-block-settings/ folder
	 *      2. Local dorectory /wp-content/plugins/global-block-settings/languages/ folder
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function load_textdomain() {
		/**
		 * Filters the languages directory path to use for plugin.
		 *
		 * @param string $lang_dir The languages directory path.
		 */
		$lang_dir = GBS_DIR . 'languages/';
		$lang_dir = apply_filters( 'gbs_languages_directory', $lang_dir );
		load_plugin_textdomain( 'gbs', false, $lang_dir );
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

		wp_enqueue_style( 'gbs-global-build', GBS_URL . 'assets/editor.css', [], $version );
	}
}

/**
 * Kicking this off by calling 'get_instance()' method
 */
GBS_Loader::get_instance();
