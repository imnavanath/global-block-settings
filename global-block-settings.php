<?php
/**
 * Plugin Name:       Global Block Settings
 * Description:       The plugin is about setting up page/post level global WordPress block settings.
 * Requires at least: 5.2
 * Requires PHP:      5.6
 * Version:           1.0.0
 * Author:            Navanath Bhosale
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gbs
 *
 * @package           Global_Block_Settings
 */

/**
 * Set Plugin constants
 */
define( 'GBS_VER', '1.0.0' );
define( 'GBS_FILE', __FILE__ );
define( 'GBS_BASE', plugin_basename( GBS_FILE ) );
define( 'GBS_DIR', plugin_dir_path( GBS_FILE ) );
define( 'GBS_URL', plugins_url( '/', GBS_FILE ) );

require_once 'plugin-loader.php';
