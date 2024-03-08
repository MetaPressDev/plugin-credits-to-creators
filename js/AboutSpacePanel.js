import React from 'react';
import ReactMarkdown from 'react-markdown';

export default class AboutSpacePanel extends React.PureComponent {

    renderCredits = (credits) => {
        return (
            <ReactMarkdown 
                components={{
                    a: ({node, ...props}) => (
                        <a 
                            {...props} 
                            style={{ color: '#4DA8DA', textDecoration: 'underline', fontWeight: 'bold' }} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                        />
                    )
                }}
            >
                {credits}
            </ReactMarkdown>
        );
    }

    render() {
             // Render UI
        return <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

            {/* Header bar */}
            <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: 0, left: 0, width: '100%', height: 44, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>

                {/* Title */}
                <div style={{ fontSize: 15, marginLeft:20, marginRight: 20, flex: '1 1 1px' }}> Credits </div>

            </div>

            {/* Scrollable content */}
            <div style={{ position: 'absolute', top: 45, left: 0, width: '100%', height: 'calc(100% - 45px)', overflowX: 'hidden', overflowY: 'auto' }}>

                {/* <ExpandableSection title='Credits' openByDefault> */}
                    {metapress.entities.all.map((entity, index) => {
                        if (!entity.credits) return null;
                        return (
                            <div key={index} style={{ fontSize: 15, margin: '0px 20px', flex: '1 1 1px' }}>
                                {this.renderCredits(entity.credits)}
                            </div>
                        );
                    })}
                {/* </ExpandableSection> */}
                
            </div>

        </div>
    }
}