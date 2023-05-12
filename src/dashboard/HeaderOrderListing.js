import { useNavigate  } from 'react-router-dom';
import Select from 'react-select'



export default function HeaderOrderListing() { 

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
      

  let navigate = useNavigate();

  
    return ( 


        <div className="filters">
             <Select className='select-filters' options={options} />
             <Select className='select-filters' options={options} />
             <Select className='select-filters' options={options} />
        </div>


    ); 
} 