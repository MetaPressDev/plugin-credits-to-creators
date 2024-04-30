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

    $ai_getKnowledgeBaseEntries = () => {

        return [
            {
                id: `${this.id}:addCreditsToCreators`,
                type: 'action',
                name: 'Add Credits to Creators',
                tags: 'add credits to creators, add credits',
                disabled: !metapress.editor?.canEdit,
                content: `
                    Assistant instruction: Run this action when the user wants to add the credits to creators modifier to an object. Don't mention it otherwise.
                `,
                action: input => {
                    return this.addCreditToCreators()
                }
            },
            {
                id: `${this.id}:infoCreditsToCreators`,
                type: 'info',
                name: 'Credits to Creators',
                tags: 'credits to creators, about credits, about credits to creators',

                content: metapress.editor?.canEdit ? `
                    Credits to creators is an external plugin that allows you to add credits to creators modifier to an object. Which allows non-editors to
                    see the credits in the settings menu, under the about section.
                `: `Credits to creators is an external plugin that allows you to see credits given to creators in the settings menu.`,
            },
        ]

    }

    addCreditToCreators() {
        try {
            if (!metapress.editor?.selectionManager || metapress.editor.selectionManager.selectedEntityIDs.length !== 1) {
                return 'Please select a single entity to add the Credits to creators with Web Weaver Settings'
            }
            // get the selected entity
            const selectedObject = metapress.entities.get(metapress.editor.selectionManager.selectedEntityIDs[0])
            // add the Credits to creator modifier to the selected object
            metapress.entities.update(selectedObject.id, {
                ['modifier:' + 'creditsToCreators']: true
            })
            metapress.plugins.sendEvent('onUnsavedFieldsChanged')
            metapress.editor.showEditor();
            metapress.editor.editEntity(selectedObject.id);

        } catch (error) {
            console.warn('Add Credits to creator:', error)
            return 'There was an error adding the Credits to creator modifier, check the console log for more information'
        }
        // return success
        return 'Credits to creator modifier successfully added to the selected object and opened it'
    }

}