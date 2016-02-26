import HeaderComponent from './react/components/header';
import CoreComponent from './core-component';

class CorePage extends CoreComponent {
  constructor(baseSelector) {
    super(baseSelector);

    this.addSelectors({
      header: 'header.header'
    });
  }

  getHeader() {
    return new HeaderComponent(this.getSelector('header', false));
  }
}

export default CorePage;
