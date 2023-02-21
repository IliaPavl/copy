import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const IntegrationSelect = ({data,setSelect}) => {
    const handleTypeSelect = e => {
        setSelect(e);
      };
    return (
        <Select
          components={animatedComponents}
          options={data}
          onChange={handleTypeSelect}
        />
      );
};

export default IntegrationSelect;