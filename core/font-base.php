<?php
/**
 * Plugin Loader.
 *
 * @package Global_Block_Settings
 * @since x.x.x
 */

namespace GBS\Core;

use GBS\Core\Traits\Get_Instance;
use GBS\Core\Helper;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Font info class for System and Google fonts.
 */
class Font_Base {

	use Get_Instance;

	/**
	 * System Fonts
	 *
	 * @since x.x.x
	 * @var array
	 */
	public static $system_fonts = array();

	/**
	 * Google Fonts
	 *
	 * @since x.x.x
	 * @var array
	 */
	public static $google_fonts = array();

	/**
	 * Get System Fonts
	 *
	 * @since x.x.x
	 *
	 * @return Array All the system fonts in CartFlows
	 */
	public static function get_system_fonts() {
		if ( empty( self::$system_fonts ) ) {
			self::$system_fonts = array(
				'Helvetica' => array(
					'fallback' => 'Verdana, Arial, sans-serif',
					'variants' => array(
						'300',
						'400',
						'700',
					),
				),
				'Verdana'   => array(
					'fallback' => 'Helvetica, Arial, sans-serif',
					'variants' => array(
						'300',
						'400',
						'700',
					),
				),
				'Arial'     => array(
					'fallback' => 'Helvetica, Verdana, sans-serif',
					'variants' => array(
						'300',
						'400',
						'700',
					),
				),
				'Times'     => array(
					'fallback' => 'Georgia, serif',
					'variants' => array(
						'300',
						'400',
						'700',
					),
				),
				'Georgia'   => array(
					'fallback' => 'Times, serif',
					'variants' => array(
						'300',
						'400',
						'700',
					),
				),
				'Courier'   => array(
					'fallback' => 'monospace',
					'variants' => array(
						'300',
						'400',
						'700',
					),
				),
			);
		}

		return apply_filters( 'gbs_system_fonts', self::$system_fonts );
	}

	/**
	 * Custom Fonts
	 *
	 * @since x.x.x
	 *
	 * @return Array All the custom fonts in CartFlows
	 */
	public static function get_custom_fonts() {
		$custom_fonts = array();

		return apply_filters( 'gbs_custom_fonts', $custom_fonts );
	}

	/**
	 * Google Fonts used in CartFlows.
	 * Array is generated from the google-fonts.json file.
	 *
	 * @since x.x.x
	 *
	 * @return Array Array of Google Fonts.
	 */
	public static function get_google_fonts() {

		if ( empty( self::$google_fonts ) ) {

			$google_fonts_file = GBS_DIR . 'core/google-fonts.php';

			if ( ! file_exists( $google_fonts_file ) ) {
				return array();
			}

			$google_fonts_contents = include $google_fonts_file;

			if ( is_array( $google_fonts_contents ) || is_object( $google_fonts_contents ) ) {
				self::$google_fonts = call_user_func_array( 'array_merge', $google_fonts_contents );
			}
		}

		return apply_filters( 'gbs_google_fonts', self::$google_fonts );
	}

	/**
	 * Get string between
	 *
	 * @param  string $string Input string.
	 * @param  string $start  First string.
	 * @param  string $end    Last string.
	 * @return string         string.
	 */
	public static function get_string_between( $string, $start, $end ) {
		$string = ' ' . $string;
		$ini    = strpos( $string, $start );
		if ( 0 == $ini ) {
			return '';
		}
		$ini += strlen( $start );
		$len  = strpos( $string, $end, $ini ) - $ini;
		return substr( $string, $ini, $len );
	}

	/**
	 * Google Font URL
	 * Combine multiple google font in one URL
	 *
	 * @link https://shellcreeper.com/?p=1476
	 * @param array $fonts      Google Fonts array.
	 */
	public static function google_fonts_url( $fonts ) {

		/* URL */
		$base_url   = '//fonts.googleapis.com/css';
		$font_args  = array();
		$family     = array();
		$google_url = '';

		/* Format Each Font Family in Array */
		foreach ( $fonts as $font_name => $font_weight ) {
			$font_name = str_replace( ' ', '+', $font_name );
			if ( ! empty( $font_weight ) ) {
				if ( is_array( $font_weight ) ) {
					$font_weight = implode( ',', $font_weight );
				}
				$font_family = explode( ',', $font_name );
				$font_family = str_replace( "'", '', Helper::gbs_get_prop( $font_family, 0 ) );
				$family[]    = trim( $font_family . ':' . urlencode( trim( $font_weight ) ) );//phpcs:ignore
			} else {
				$family[] = trim( $font_name );
			}
		}

		/* Only return URL if font family defined. */
		if ( ! empty( $family ) ) {

			/* Make Font Family a String */
			$family = implode( '|', $family );

			/* Add font family in args */
			$font_args['family'] = $family;

			$google_url = add_query_arg( $font_args, $base_url );
		}

		return $google_url;
	}

	/**
	 * Generate Google Font URL from the post meta.
	 *
	 * @param  integer $post_id Post ID.
	 */
	public static function generate_google_url( $post_id ) {

		$fonts        = array();
		$system_fonts = self::get_system_fonts();

		$font_fields = array(
			array(
				'font-family' => 'gbs-meta-text-font-family',
				'font-weight' => 'gbs-meta-text-font-weight',
			),
			array(
				'font-family' => 'gbs-meta-link-font-family',
				'font-weight' => 'gbs-meta-link-font-weight',
			),
			array(
				'font-family' => 'gbs-meta-headings-font-family',
				'font-weight' => 'gbs-meta-headings-font-weight',
			),
			array(
				'font-family' => 'gbs-meta-h1-heading-font-family',
				'font-weight' => 'gbs-meta-h1-heading-font-weight',
			),
			array(
				'font-family' => 'gbs-meta-h2-heading-font-family',
				'font-weight' => 'gbs-meta-h2-heading-font-weight',
			),
			array(
				'font-family' => 'gbs-meta-h3-heading-font-family',
				'font-weight' => 'gbs-meta-h3-heading-font-weight',
			),
			array(
				'font-family' => 'gbs-meta-h4-heading-font-family',
				'font-weight' => 'gbs-meta-h4-heading-font-weight',
			),
			array(
				'font-family' => 'gbs-meta-h5-heading-font-family',
				'font-weight' => 'gbs-meta-h5-heading-font-weight',
			),
			array(
				'font-family' => 'gbs-meta-h6-heading-font-family',
				'font-weight' => 'gbs-meta-h6-heading-font-weight',
			),
		);

		$font_fields = apply_filters( 'gbs_font_family_fields', $font_fields, $post_id );

		foreach ( $font_fields as $index => $field ) {

			$font_family_value = get_post_meta( $post_id, $field['font-family'], true );

			if ( ! empty( $font_family_value ) && ! isset( $system_fonts[ $font_family_value ] ) ) {

				$font_weight_value = isset( $field['font-weight'] ) ? get_post_meta( $post_id, $field['font-weight'], true ) : '';

				$fonts[ self::get_string_between( $font_family_value, '\'', '\'' ) ] = $font_weight_value;
			}
		}

		return self::google_fonts_url( $fonts );
	}

	/**
	 * Font family field.
	 *
	 * @return array field.
	 */
	public static function get_font_family() {

		$font_family[0] = array(
			'value' => '',
			'label' => __( 'Default', 'gbs' ),
		);

		$system_font_family = array();
		$google_font_family = array();

		foreach ( self::get_system_fonts() as $name => $variants ) {
			array_push(
				$system_font_family,
				array(
					'value' => $name,
					'label' => esc_attr( $name ),
				)
			);
		}

		$font_family[1] = array(
			'label'   => __( 'System Fonts', 'gbs' ),
			'options' => $system_font_family,
		);

		foreach ( self::get_google_fonts() as $name => $single_font ) {
			$variants   = Helper::gbs_get_prop( $single_font, 'variants' );
			$category   = Helper::gbs_get_prop( $single_font, 'category' );
			$font_value = '\'' . esc_attr( $name ) . '\', ' . esc_attr( $category );
			array_push(
				$google_font_family,
				array(
					'value' => $font_value,
					'label' => esc_attr( $name ),
				)
			);
		}

		$font_family[2] = array(
			'label'   => __( 'Google Fonts', 'gbs' ),
			'options' => $google_font_family,
		);

		return $font_family;
	}
}
