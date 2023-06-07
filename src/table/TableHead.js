const TableHead = ({ columns }) => {

    try {
    return (
     <thead>
      <tr>
       {columns.map(({ label, accessor }) => {
        return <th key={accessor}>{label}</th>;
       })}
      </tr>
     </thead>
    );
    } catch (e) {
        return null;
    }
   };
   
   export default TableHead;