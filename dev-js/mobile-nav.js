const sectionSelectors = [
    '.interactive-column--text',
    '.interactive-column--media',
    '.interactive-bottom'
];

let mobileNav;

window.onload = () => {
    mobileNav = d3.select('#mobile-nav');
    
    d3.select('#mobile-menu').on('click', function() {
        this.classList.toggle('active');
    });
    
    let cyoa = d3.select('inkd-cyoa')
        .on('node-change', handleNodeChange);

    let node = cyoa.select('inkd-node');
    if (!node.empty()) {
        updateNavItems(node);
    }
}

function handleNodeChange() {
    let node = d3.select(d3.event.detail.node);
    updateNavItems(node);
}

function updateNavItems(node) {
    let navData = [];
    
    for (let selector of sectionSelectors) {
        let section = node.select(selector)
            .classed('active', false);
        let title = section.attr('data-title');
        navData.push({section, title});
    }
    
    let navItems = mobileNav
        .selectAll('li')
        .data(navData);
    
    navItems
        .text((d) => d.title)
        .on('click', handleNavClick);
    
    navItems
        .enter()
        .append('li')
            .classed('navbar__item', true)
            .text((d) => d.title)
            .on('click', handleNavClick);
    
    navItems.exit().remove();
        
    let activeItem = mobileNav.select('li.active');
    activeItem = activeItem.empty() ? mobileNav.select('li') : activeItem;
    
    setSectionState(activeItem);
}

function setSectionState(navSelection, active = true) {
    navSelection
            .classed('active', active)
        .datum().section
            .classed('active', active);
}

function handleNavClick(datum, i, navNodes) {
    for (let node of navNodes) {
        setSectionState(d3.select(node), node === this);
    }
}