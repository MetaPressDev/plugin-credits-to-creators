//
// My MetaPress Plugin
import AboutSpacePanel from './AboutSpacePanel'
import packageJson from '../package.json'
import React from 'react';
import CreditsToCreator from './CreditsToCreator';
export default class CreditsToCreators {

    // Plugin information
    id = packageJson.metapress?.id || packageJson.name
    name = packageJson.metapress?.name || packageJson.name
    description = packageJson.metapress?.description || packageJson.description
    version = packageJson.version
    provides = ['modifier:creditsToCreators']
    requires = ['entities', 'menubar']

    /** Called on load */
    onLoad() {

    }
    createModifier(type) {
        return new CreditsToCreator()
    }

    $siteSettings_getSettingSources() {
        return {
            id: 'creditsToCreators.button',
            section: 'help',
            name: 'Credits to Creators',
            text: 'Credits to Creators',
            type: 'button',
            onClick: () => this.onClick()
        }
    }

    onClick() {
        metapress.menubar.openReactPanel('creditsToCreators', () => <AboutSpacePanel plugin={this} />)
    }

}