"use strict"

import { registerPlugin } from '@wordpress/plugins';
import GlobalMetaSetup from '@Editor/components/Settings';

registerPlugin( 'global-block-settings', { render: GlobalMetaSetup } );
