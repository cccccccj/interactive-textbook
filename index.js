var dividerData = [
    {
        selector: '.horizontal-divider',
        direction: 'horizontal', 
        paneSelectors: ['.interactive-container', '.interactive-bottom'], 
        minFactor: 0.2
    },
    {
        selector: '.vertical-divider',
        direction: 'vertical', 
        paneSelectors: ['.interactive-column--text', '.interactive-column--video'], 
        minFactor: 0.2
    }
];

var dragBehavior = d3.drag()
    .on('start', handleDragStart)
    .on('drag', handleDrag)
    .on('end', handleDragEnd);

// To make sure that 'Polymer.dom' is available
HTMLImports.whenReady(function() {
    for (var i = 0; i < dividerData.length; i++) {
        var data = dividerData[i];
        var dividerElements = Polymer.dom(document).querySelectorAll(data.selector);
        d3.selectAll(dividerElements)
            .datum(data)
            .call(dragBehavior);
    }
});

function handleDrag() {
    var divider = d3.select(this);
    var data = divider.datum();
    var parentElement = divider.node().parentNode;
    
    if (data.direction === 'horizontal') {
        var total = parentElement.offsetHeight - this.offsetHeight;
        var coord = 'y';
        var property = 'height';
    } else {
        var total = parentElement.offsetWidth - this.offsetWidth;
        var coord = 'x';
        var property = 'width';
    }
    
    var factor = Math.max(Math.min(d3.event[coord] / total, 1 - data.minFactor), data.minFactor);
    var parent = d3.select(parentElement);

    parent.select(data.paneSelectors[0])
            .style(property, `${factor * total}px`)
    
    parent.select(data.paneSelectors[1])
            .style(property, `${(1 - factor) * total}px`)    
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