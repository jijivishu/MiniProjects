import PlainDisplay from './PlainDisplay';
import DetailedBooleanDisplay from './DetailedBooleanDisplay';
import NestedDisplay from './NestedDisplay';
import DetailedDisplay from './DetailedDisplay';

// Sepending on the type of section, respective display components are called to render designated data.
function DisplaySection({ section }) {
    switch (section.type) {
      case 'plainDisplay':
        return <PlainDisplay parameters={section.parameters} />;
      case 'detailedBooleanDisplay':
        return <DetailedBooleanDisplay parameters={section.parameters} />;
      case 'nestedDisplay':
        return <NestedDisplay parameters={section.parameters} />;
      case 'detailedDisplay':
        return <DetailedDisplay parameters={section.parameters} />;
      default:
        return null;
    }
  }

  export default DisplaySection;