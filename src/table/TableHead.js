const TableHead = ({ columns }) => {

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
    try {
    return (
     <thead>
      <tr>
       {columns.map(({ label, accessor }) => {
        return <th key={uuid()}>{label}</th>;
       })}
      </tr>
     </thead>
    );
    } catch (e) {
        return null;
    }
   };
   
   export default TableHead;