import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TransactionService from '../services/TransactionService';
import { useSelector, useDispatch } from 'react-redux'

const AddOrderPosition = (props) => {
  const [idents, setIdents] = useState([]);
  const [selectedIdent, setSelectedIdent] = useState(null);
  const [quantity, setQuantity] = useState('');
  const order = useSelector((state) => state.data.orderKey)
  const userId = useSelector((state) => state.user.userId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TransactionService.getIdents();
        const identObjects = response.data.map((ident) => ({ label: ident, value: ident }));
        setIdents([{ label: '', value: '' }, ...identObjects]);
      } catch (error) {
        // Error handling
      }
    };

    fetchData();
  }, []);

  const handleAddOrderPosition = () => {
    if (selectedIdent) {
      // Here you can use the selectedIdent and quantity states for further processing
      console.log('Selected Ident:', selectedIdent);
      console.log('Quantity:', quantity);
      var toSend = {
        HeadID: props.current,
        Qty: quantity,
        Ident: selectedIdent.value,
        Clerk:  userId

      }



      alert(JSON.stringify(toSend));
      // Clear the state after adding
      setSelectedIdent(null);
      setQuantity('');
    }
  };

  if (!props.isVisible || props.current == -1) {

    return null;
  }
  function onClose() {
    props.onClose();
  }
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <button className="popup-close-btn" onClick={onClose} >
            X
          </button>
        </div>
        <div className="popup-body">
          <label htmlFor="ident">Ident:</label>
          <Select
            placeholder="Ident"
            id="identListControl"
            options={idents}
            value={selectedIdent}
            onChange={(selectedOption) => setSelectedIdent(selectedOption)}
          />
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            className="popup-input"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />


          <div className="center-button">
            <span onClick={handleAddOrderPosition} className="actions smallerr">
              Add
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderPosition;