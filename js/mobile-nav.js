'use strict';

var sectionSelectors = ['.interactive-column--text', '.interactive-column--media', '.interactive-bottom'];

var mobileNav = void 0;

window.onload = function () {
    mobileNav = d3.select('#mobile-nav');

    d3.select('#mobile-menu').on('click', function () {
        this.classList.toggle('active');
    });

    var cyoa = d3.select('inkd-cyoa').on('node-change', handleNodeChange);

    var node = cyoa.select('inkd-node');
    if (!node.empty()) {
        updateNavItems(node);
    }
};

function handleNodeChange() {
    var node = d3.select(d3.event.detail.node);
    updateNavItems(node);
}

function updateNavItems(node) {
    var navData = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = sectionSelectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var selector = _step.value;

            var section = node.select(selector).classed('active', false);
            var title = section.attr('data-title');
            navData.push({ section: section, title: title });
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

    var navItems = mobileNav.selectAll('li').data(navData);

    navItems.text(function (d) {
        return d.title;
    }).on('click', handleNavClick);

    navItems.enter().append('li').classed('navbar__item', true).text(function (d) {
        return d.title;
    }).on('click', handleNavClick);

    navItems.exit().remove();

    var activeItem = mobileNav.select('li.active');
    activeItem = activeItem.empty() ? mobileNav.select('li') : activeItem;

    setSectionState(activeItem);
}

function setSectionState(navSelection) {
    var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    navSelection.classed('active', active).datum().section.classed('active', active);
}

function handleNavClick(datum, i, navNodes) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = navNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var node = _step2.value;

            setSectionState(d3.select(node), node === this);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
}
//# sourceMappingURL=mobile-nav.js.map
