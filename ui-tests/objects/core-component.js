class CoreComponent {
  constructor(baseSelector) {
    this.baseSelector = baseSelector;
    this.selectors = {};
  }

  addSelectors(selectors) {
    //TODO: use Object.assign
    this.selectors = Object.assign(this.selectors, selectors);
  }

  getSelector(selectorName, prependBaseSelector) {
    if (!this.selectors[selectorName]) {
      return '';
    }

    let selector = '';

    if (prependBaseSelector !== false) {
      selector += this.baseSelector + ' ';
    }

    selector += this.selectors[selectorName];

    return selector.trim();
  }
}

export default CoreComponent;
