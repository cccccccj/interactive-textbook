'use strict';

var dividerData = [{
    selector: '.horizontal-divider',
    direction: 'horizontal',
    paneSelectors: ['.interactive-container', '.interactive-bottom'],
    minFactor: 0.2
}, {
    selector: '.vertical-divider',
    direction: 'vertical',
    paneSelectors: ['.interactive-column--text', '.interactive-column--media'],
    minFactor: 0.2
}];

var dragBehavior = d3.drag().on('start', handleDragStart).on('drag', handleDrag).on('end', handleDragEnd);

HTMLImports.whenReady(function () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = dividerData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var data = _step.value;

            var dividerElements = Polymer.dom(document).querySelectorAll(data.selector);
            d3.selectAll(dividerElements).datum(data).call(dragBehavior);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
});

function handleDrag() {
    var divider = d3.select(this);
    var data = divider.datum();
    var parentElement = divider.node().parentNode;

    var total = void 0,
        coord = void 0,
        property = void 0;
    if (data.direction === 'horizontal') {
        total = parentElement.offsetHeight - this.offsetHeight;
        coord = 'y';
        property = 'height';
    } else {
        total = parentElement.offsetWidth - this.offsetWidth;
        coord = 'x';
        property = 'width';
    }

    var factor = Math.max(Math.min(d3.event[coord] / total, 1 - data.minFactor), data.minFactor);
    var parent = d3.select(parentElement);

    parent.select(data.paneSelectors[0]).style(property, factor * 100 + '%');

    parent.select(data.paneSelectors[1]).style(property, (1 - factor) * 100 + '%');
}

function handleDragStart() {
    d3.selectAll('iframe').style('pointer-events', 'none');
}

function handleDragEnd() {
    d3.selectAll('iframe').style('pointer-events', 'auto');
}
//# sourceMappingURL=section-divider.js.map
