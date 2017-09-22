const dividerData = [
    {
        selector: '.horizontal-divider',
        direction: 'horizontal', 
        paneSelectors: ['.interactive-container', '.interactive-bottom'], 
        minFactor: 0.2
    },
    {
        selector: '.vertical-divider',
        direction: 'vertical', 
        paneSelectors: ['.interactive-column--text', '.interactive-column--media'], 
        minFactor: 0.2
    }
];

let dragBehavior = d3.drag()
    .on('start', handleDragStart)
    .on('drag', handleDrag)
    .on('end', handleDragEnd);

// To make sure that 'Polymer.dom' is available
HTMLImports.whenReady(() => {
    for (let data of dividerData) {
        let dividerElements = Polymer.dom(document).querySelectorAll(data.selector);
        d3.selectAll(dividerElements)
            .datum(data)
            .call(dragBehavior);
    }
});

function handleDrag() {
    let divider = d3.select(this);
    let data = divider.datum();
    let parentElement = divider.node().parentNode;
    
    let total, coord, property;
    if (data.direction === 'horizontal') {
        total = parentElement.offsetHeight - this.offsetHeight;
        coord = 'y';
        property = 'height';
    } else {
        total = parentElement.offsetWidth - this.offsetWidth;
        coord = 'x';
        property = 'width';
    }
    
    let factor = Math.max(Math.min(d3.event[coord] / total, 1 - data.minFactor), data.minFactor);
    let parent = d3.select(parentElement);

    parent.select(data.paneSelectors[0])
            .style(property, `${factor * 100}%`)
    
    parent.select(data.paneSelectors[1])
            .style(property, `${(1 - factor) * 100}%`)    
}

// Fix for 'mouseup' event being called over iframes
function handleDragStart() {
    d3.selectAll('iframe')
        .style('pointer-events', 'none');
}

function handleDragEnd() {    
    d3.selectAll('iframe')
        .style('pointer-events', 'auto');
}